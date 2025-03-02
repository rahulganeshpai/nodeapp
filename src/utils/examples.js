class Examples {
  generate_kms() {
    return `
        apiVersion: kms.aws.signavio.cloud/v1alpha1
        kind: CKey
        metadata:
            name: example-kms
        spec:
            compositeDeletePolicy: Foreground
            compositionSelector:
                matchLabels:
                    crossplane.io/xrd: xkeys.kms.aws.signavio.cloud
                    crossplane.io/cloud-provider: aws
            resourceConfig:
                tags:
                org/team: cloud-sre
                org/group: platform
            
        `;
  }
}

const examples = new Examples();
export default examples;
