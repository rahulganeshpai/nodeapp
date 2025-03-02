---
slug: /
sidebar_position: 1
---

<head>
<meta name="viewport" content="initial-scale=1, width=device-width" />
</head>

# Introduction

CRD Browser is an interactive tool designed to simplify the navigation, exploration, and understanding of Custom Resource Definitions (CRDs) in the Crossplane ecosystem. Crossplane extends Kubernetes with cloud-native capabilities by offering CRDs for provisioning cloud infrastructure. This browser aids developers, DevOps engineers, and cloud architects in managing these complex resources more effectively.

## Features

- **Intuitive Navigation**: Easily browse through various CRDs provided by Crossplane.
- **Detailed Descriptions**: View in-depth details about each CRD, including their schemas, specifications, and associated status fields.
- **Version Support**: Supports multiple versions of CRDs, allowing you to switch and compare differences between versions.
- **Search and Filter**: Quickly find CRDs using the search functionality or filter them based on specific attributes.
- **YAML/JSON Views**: Examine or export CRD specifications in both YAML and JSON formats.
- **Dependency Visualization**: Visualize relationships and dependencies between different CRDs.

## Getting Started

To start using the Crossplane CRD Browser, follow these steps:

### Prerequisites

- A Kubernetes cluster with Crossplane installed.
- Access to the cluster's API server for fetching current CRDs.

### Installation

```bash
# Clone the repository
git clone https://github.com/example/crossplane-crd-browser.git

# Navigate into the directory
cd crossplane-crd-browser

# Run the browser
# Note: The actual command might differ based on the implementation (e.g., Docker, npm, etc.)
npm install
npm start