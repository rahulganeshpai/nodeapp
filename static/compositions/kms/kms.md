# Kuttl Test Suite

[Kuttl](https://kuttl.dev/) is a handy tool to do integration testing in Kubernetes.
The operating principle is quite simple. Just prepare YAML with the status of the manifests we want to test, and Kuttl compares the real manifests within the cluster with the reference models.
If there is a difference between desired and actual state, the test fails. Otherwise, it will exit with `0`.

## How to write Test Suite

A Test Suite consists of a few YAML manifests, including:

- [TestSuite](https://kuttl.dev/docs/testing/reference.html#testsuite): This file contains the global configuration of the test, including some preliminary commands (for example, installation of software or configurations) and configuration parameters such as the timeout or the paths to look for all the other manifests that are part of the suite.
- [TestStep](https://kuttl.dev/docs/testing/reference.html#teststep): These manifests contain the individual test steps. They are grouped according to the folder they are in and are launched alphabetically. Depending on the suite configuration, they can be run in parallel.


## Run Kuttl tests locally

**Requirement**

- [Taskfile](https://taskfile.dev/#/) must be installed
- Existing VPC and SSM Parameter `/core/network/vpc/vpc-id`
- [aws-azure-login](https://wiki.one.int.sap/wiki/pages/viewpage.action?spaceKey=SIGCOS&title=Accessing+AWS+accounts+as+a+Developer+using+SSO#AccessingAWSaccountsasaDeveloperusingSSO-aws-azure-login) must be installed
- [Crossplane CLI](https://docs.crossplane.io/v1.15/cli/) must be installed
- [Kuttl Kubectl plugin](https://kuttl.dev/docs/cli.html#setup-the-kuttl-kubectl-plugin) must be installed

You need to authenticate to account where you want to deploy crossplane resources.
By default this is `cloudos-services-staging` (set by `AWS_PROFILE` and `AWS_PROFILE_TEST`).
If you are asked to choose a role, use the `TerraformAccessRole` role.

```shell
aws-azure-k8s # choose cloudos-services-staging -> TerraformAccessRole
```

Now you can prepare the kind cluster. This command initially can take 10-15 minutes to complete :coffee:

```shell
export AWS_PROFILE="cloudos-services-staging"
# run specific composition test
cd kuttl
# this will setup the kind cluster and configure crossplane
task setup
# you can see other available targets with
task -l
# you can run also run tests for example
task test-s3
```

> **IMPORTANT** If your aws credentials expires, crossplane will cause significant load on your machine. Before you delete kind cluster you need make sure to delete all resources in crossplane. You can do this by running `task teardown`. As an alternative, you can refresh your AWS credentials with `task install-aws-secrets`

All created resources will be removed automatically after the test.
To avoid deletion for faster iterations. You can set env var `DELETE_ON_TEARDOWN=false` to keep the resources.

```shell
export DELETE_ON_TEARDOWN=false
task test-s3
```

The environment variable `KUBERNETES_VERSION` is defined and then used in both the [integration_test.yaml](../.github/workflows/integration_test.yaml) and the [taskfile.yaml](./taskfile.yaml) to create the Kind cluster with the proper version.
The environment variable `CROSSPLANE_VERSION` is defined and then used in both the [integration_test.yaml](../.github/workflows/integration_test.yaml) and the [taskfile.yaml](./taskfile.yaml) to install Crossplane CLI in our pipeline, locally you need to make sure the crossplane cli is installed.
It is necessary to run the `crossplane beta trace` command in the Kuttl test locally and in the pipeline, and it can be helpful for testing against different Crossplane versions. If you want to test against different Kubernetes or Crossplane versions, you need to export the variables `KUBERNETES_VERSION ` or `CROSSPLANE_VERSION ` before running the task with the version you want to test against. If you do not export it, it will use the default version against which we run our tests.

### Verify AWS credentials

Use this command to verify the proper injection of the credentials into the Kind cluster.

```shell
kubectl get secrets -n crossplane-integration-test aws-secret -o json | jq '.data.creds' | base64 -D
```

## FAQ

### How can I enable ECR access to suite-saas-dev?

We will push our compositions as OCR image to AWS ECR. If you want to install and test those composition: just add environment variable and you run other tasks as usual. Before you run this you need to login to account `suite-saas-dev` with `TerraformAccessRole` or `CloudformationAccessRole`.

```shell
export ECR_DEV_ENABLED=true # this is true by default and part of the setup task
task install-aws-secrets
```

You can find the list of available images [in suite-ecr reo](https://github.com/signavio/suite-ecr/blob/d6b3f4af1af0640b741c94972104bb14bc799020/.projenrc.ts#L28-L47).

The you can install configuration that are referencing OCR images with [ImagePullSecrets](https://docs.crossplane.io/latest/concepts/packages/#install-a-configuration-from-a-private-registry)

### How to add a test to the test suite

To add a test for a new composition you need to consider the following:

-  Create a folder in [kuttl/tests/compositions](./tests/compositions/). It is important that the folder you create follows this naming pattern AWS-Service/ResourceName, for example: s3/bucket.
-  Add the test files in your folder, you can follow the [example structure](./tests/compositions/s3/bucket/) and adjust it for your purpose.
- Make sure your also add your provider to the [kuttl/tests/init](./tests/init/) folder.

### How to set a timeout for a test step

By default, the timeout for each step is defined as `timeout` in [testsuite.yaml](./kuttl-test.yaml).
However, sometimes a resource needs longer to be provisioned. In this case, you can overide the timeout for a specific step in the assertion file.

```yaml
apiVersion: kuttl.dev/v1beta1
kind: TestAssert
# message queue needs 12m to start giving 18m here
timeout: 1080
```

### Avoid kubernetes dependencies of compositions

Do not put any kubernetes dependency into the claim.
For example do not create a `Secret` in the same claim file. Kuttl will try to delete any resource that is specified in claim from `apply` step.
If your composition requires this `Secret`, and the secret is deleted before the claim, then the deletion will fail.
The deletion order is not guaranteed. Here is **wrong example**:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mq-admin-password
  namespace: crossplane-integration-test
stringData:
  password: "fffXlzasdqZWqwwqqwqwRQYXNzd29yZDEh"
---
apiVersion: mq.aws.signavio.cloud/v1alpha1
kind: CQueue
...
```

### Use random identifiers for resources

If you need to random names for resources, you can put a variable into the value of claim fields.
Envsubst will replace it if the environment variable is defined. By default `RANDOM_SUFFIX` is available.
It represents the git commit hash.

```yaml
kind: CQueue
metadata:
  name: example
spec:
  resourceConfig:
    instanceName: example-testing-${RANDOM_SUFFIX}
    tags:
      meta.signavio.com/creator: ${CREATOR}
```