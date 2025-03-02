import React, { useState } from "react";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddBoxRoundedIcon from "@mui/icons-material/ControlPoint";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import examples from "../../utils/examples";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  console.log(examples.generate_kms());
  const [isTreeVisible, setIsTreeVisible] = useState(true);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isTable, setisTable] = useState(false);

  const toggleTreeVisibility = () => {
    setIsTreeVisible((prev) => !prev);
  };

  const toggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };
  
  const toggleTableVisibility = () => {
    setisTable((prev) => !prev);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [createData("xkey.kms.aws.signavio.cloud", "Composition", "v1.1.1"),
    createData("xkeys.kms.aws.signavio.cloud", "CompositeResourceDefinition", "v1alpha1"),
    createData("upbound/provider-aws-kms:v1", "Provider", "v1")
  ];

  return (
    <div>
       <br />
      <Stack spacing={2} direction="row">
        <Button variant="text">README</Button>
        <Button variant="text" onClick={toggleTreeVisibility}>
          Schema
        </Button>
        <Button variant="text" onClick={toggleTableVisibility}>DEPENDENCIES</Button>
        <Button variant="text" onClick={toggleCardVisibility}>
          Example
        </Button>
      </Stack>
      <br />
      {isCardVisible && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              <pre>{examples.generate_kms()}</pre>
            </Typography>
          </CardContent>
        </Card>
      )}
      {isTable && (
      <TableContainer component={Paper}>
        <Table
          sx={{
            tableLayout: "auto",
            "& .MuiTableCell-root": {
              border: "none", // Remove borders
            },
          }}
          aria-label="simple table"
        >
          <TableHead sx={{ "background-color": "white" }}>
            <TableRow>
              <TableCell sx={{
                    width: 420,
                    backgroundColor: "white",
                  }} align="left">Name</TableCell>
              <TableCell sx={{
                    width: 420,
                    backgroundColor: "white",
                  }} align="left">Type</TableCell>
              <TableCell sx={{
                    width: 420,
                    backgroundColor: "white",
                  }} align="left">Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  // No border rule for the last row originally
                }}
              >
                <TableCell sx={{ backgroundColor: "white"}} align="left" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{ backgroundColor: "white"}} align="left">{row.calories}</TableCell>
                <TableCell sx={{ backgroundColor: "white"}} align="left">{row.fat}</TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
      {isTreeVisible && (
        <SimpleTreeView
          aria-label="customized"
          defaultExpandedItems={["1", "3"]}
          slots={{
            expandIcon: ExpandIcon,
            collapseIcon: CollapseIcon,
            endIcon: EndIcon,
          }}
          sx={{
            overflowX: "hidden",
            minHeight: 270,
            flexGrow: 1,
            maxWidth: 300,
          }}
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
      )}
    </div>
  );
};

export default BorderedTreeView;
