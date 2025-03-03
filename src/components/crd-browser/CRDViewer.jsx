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
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    display: "flex", // Align children horizontally
    alignItems: "center",
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
  console.log(crdData.spec.versions[0].schema.openAPIV3Schema.properties);
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

  const rows = [
    createData("xkey.kms.aws.signavio.cloud", "Composition", "v1.1.1"),
    createData(
      "xkeys.kms.aws.signavio.cloud",
      "CompositeResourceDefinition",
      "v1alpha1"
    ),
    createData("upbound/provider-aws-kms", "Provider", "v1"),
  ];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <br />
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={9} // Adjust spacing as needed for visual comfort
        sx={{
          padding: 2, // Padding around the entire stack
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap", // Ensures items wrap in smaller viewports
          "& > *": {
            margin: "2px", // Customize the spacing here
          },
        }}
      >
        <Box>
          <Typography variant="body1">
            <b>Type:</b>
          </Typography>
          <Typography variant="body2">CRD</Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            <b>Kind:</b>
          </Typography>
          <Typography variant="body2">CKey</Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            <b>Group:</b>
          </Typography>
          <Typography variant="body2">kms.aws.signavio.cloud</Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            <b>Version:</b>
          </Typography>
          <Typography variant="body2">v1alpha1</Typography>
        </Box>
      </Stack>
      <br />
      <Divider />
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="text">README</Button>
        <Button variant="text" onClick={toggleTreeVisibility}>
          Schema
        </Button>
        <Button variant="text" onClick={toggleTableVisibility}>
          DEPENDENCIES
        </Button>
        <Button variant="text" onClick={toggleCardVisibility}>
          Example
        </Button>
      </Stack>
      <br />
      {isCardVisible && (
        <Card sx={{ minWidth: 275, maxWidth: 900, marginRight: "auto" }}>
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
                <TableCell
                  sx={{
                    width: 420,
                    backgroundColor: "white",
                  }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    width: 420,
                    backgroundColor: "white",
                  }}
                  align="left"
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    width: 420,
                    backgroundColor: "white",
                  }}
                  align="left"
                >
                  Version
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ backgroundColor: "white" }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }} align="left">
                    {row.calories}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }} align="left">
                    {row.fat}
                  </TableCell>
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
              Specifies how the provider creates, observes, updates, and deletes
              resources
              <CustomTreeItem itemId="21" label="aws">
                Provider name for AWS
              </CustomTreeItem>
            </CustomTreeItem>
            <CustomTreeItem
              itemId="3"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Typography>resourceConfig</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "1px 8px", // Adjust padding for a smaller button
                      fontSize: "0.65rem", // Smaller font size
                      "&.Mui-disabled": {
                        backgroundColor: "green",
                        color: "white",
                        borderColor: "green",
                      },
                    }}
                  >
                    Required
                  </Button>
                </Box>
              }
            >
              ResourceConfig defines the general properties of this AWS
              resource.
              <CustomTreeItem itemId="31" label="tag">
                Key-value map of resource tags.
              </CustomTreeItem>
            </CustomTreeItem>
          </CustomTreeItem>
          <CustomTreeItem itemId="11" label="status">
            {" "}
            A Status represents the observed state.
            <CustomTreeItem itemId="12" label="KeyArn">
              KMS Key ARN.
            </CustomTreeItem>
            <CustomTreeItem itemId="13" label="KeyAlias">
              KMS Key Alias.
            </CustomTreeItem>
          </CustomTreeItem>
        </SimpleTreeView>
      )}
    </div>
  );
};

export default BorderedTreeView;
