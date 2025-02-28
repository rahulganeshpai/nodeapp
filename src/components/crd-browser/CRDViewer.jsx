import * as React from 'react';
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddBoxRoundedIcon from "@mui/icons-material/ControlPoint";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

const BorderedTreeView = ({ crdData }) => {
  console.log(crdData);
  return (
    <div>
      <Stack spacing={2} direction="row">
      <Button variant="text">README</Button>
      <Button variant="text">DEPENDENCIES</Button>
      <Button variant="text">XRD</Button>
      <Button variant="text">Composition</Button>
      <Button variant="text">Example</Button>
    </Stack>
    <br></br>
      <SimpleTreeView
        aria-label="customized"
        defaultExpandedItems={["1", "3"]}
        slots={{
          expandIcon: ExpandIcon,
          collapseIcon: CollapseIcon,
          endIcon: EndIcon,
        }}
        sx={{ overflowX: "hidden", minHeight: 270, flexGrow: 1, maxWidth: 300 }}
      >
        <CustomTreeItem itemId="1" label="spec">
          <CustomTreeItem itemId="2" label="providerConfigRef">
            "Hello"
          </CustomTreeItem>
          <CustomTreeItem itemId="3" label="availabilityZone" />
          <CustomTreeItem itemId="6" label="subnetType" />
          <CustomTreeItem itemId="7" label="overrideMetadataName" />
        </CustomTreeItem>
        <CustomTreeItem itemId="11" label="status">
          <CustomTreeItem itemId="12" label="availabilityZone" />
          <CustomTreeItem itemId="13" label="subnetId" />
          <CustomTreeItem itemId="14" label="vpcId" />
          <CustomTreeItem itemId="15" label="subnetType" />
          <CustomTreeItem itemId="16" label="subnetTags" />
        </CustomTreeItem>
      </SimpleTreeView>
    </div>
  );
};

export default BorderedTreeView;
