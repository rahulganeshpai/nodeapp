import React, { useState, Fragment } from "react";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddBoxRoundedIcon from "@mui/icons-material/ControlPoint";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import examples from "../../utils/examples";
import { Link } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance with Roboto as the default font
const typographyTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',  // Ensures Roboto is used
    body1: {
      fontSize: '0.85rem', // Applies to all Typography components using the body1 variant
    },
  },
});

const TypeBadgeButton = ({ label, sx = {} }) => {
  const styles = {
    OBJECT: { backgroundColor: "#1976d2", color: "white" },
    STRING: { backgroundColor: "#2e7d32", color: "white" },
    REQUIRED: {
      backgroundColor: "#A9A9A9",
      color: "white",
      "&:hover": {
        backgroundColor: "#A9A9A9",
      },
    },
  };

  return (
    <Button
      variant="contained"
      size="small"
      sx={{
        padding: "1px 8px",
        fontSize: "0.65rem",
        ...styles[label], // Apply specific styles based on the label
        ...sx, // Merge with additional styles if provided
      }}
    >
      {label}
    </Button>
  );
};

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(1.5, 1),
    margin: theme.spacing(0.2, 0),
    display: "flex",
    alignItems: "center",
    width: "auto",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-selected, &.Mui-selected:focus, &.Mui-selected:hover": {
      backgroundColor: "transparent",
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 35,
    borderLeft: `0.4px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const ExpandIcon = (props) => {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
};

const CollapseIcon = (props) => {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
};

const EndIcon = (props) => {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
};

// Recursive tree item generator
const generateTreeItems = (data, requiredFields = [], parentId = "") => {
  return Object.keys(data).map((key, index) => {
    const itemId = `${parentId}-${key}-${index}`;
    const node = data[key];
    const type = node.properties ? "Object" : node.type;
    const isRequired = requiredFields.includes(key);
    return (
      <Fragment>
        <CustomTreeItem
          key={itemId}
          itemId={itemId}
          label={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                <b>{key}</b>
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {isRequired && (
                  <TypeBadgeButton label={"Required".toUpperCase()} />
                )}
                {type && <TypeBadgeButton label={type.toUpperCase()} />}
              </Box>
            </Box>
          }
        >
          {node.description && (
            <Box sx={{ mt: 1, mb: 2 }}>{node.description}</Box>
          )}
          {node.properties &&
            generateTreeItems(node.properties, node.required || [], itemId)}
        </CustomTreeItem>
      </Fragment>
    );
  });
};

const Generate_tree = ({ crdData }) => {
  const { properties, required = [] } =
    crdData.spec.versions[0].schema.openAPIV3Schema;
  const { spec, status } = properties;
  console.log(properties);
  return (
    <SimpleTreeView
      aria-label="customized"
      defaultExpandedItems={["-spec-0", "-status-1"]}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        endIcon: EndIcon,
      }}
      sx={{ overflowX: "auto", minHeight: 270, marginLeft: 2, flexGrow: 1 }}
    >
      {generateTreeItems({ spec: spec }, spec.required)}
      <Divider sx={{ my: 2 }} />
      {generateTreeItems({ status: status }, status.required)}
    </SimpleTreeView>
  );
};

const App = ({ crdData }) => {
  const [isSchema, setIsSchema] = useState(true);
  const [isExample, setIsExample] = useState(false);
  const [isDependencies, setIsDependencies] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const createData = (name, type, version) => {
    return { name, type, version };
  };

  const rows = [
    createData("xkey.kms.aws.signavio.cloud", "Composition", "v1.1.1"),
    createData(
      "xkeys.kms.aws.signavio.cloud",
      "CompositeResourceDefinition",
      "v1alpha1"
    ),
    createData("upbound/provider-aws-kms", "Provider", "v1"),
  ];

  const toggleVisbility = (type) => {
    switch (type) {
      case "SCHEMA":
        setIsSchema(true);
        setIsExample(false);
        setIsDependencies(false);
        break;
      case "EXAMPLE":
        setIsSchema(false);
        setIsExample(true);
        setIsDependencies(false);
        break;
      case "DEPENDENCIES":
        setIsSchema(false);
        setIsExample(false);
        setIsDependencies(true);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Stack spacing={3} direction="row" sx={{ my: 5 }}>
        <Button
          variant="text"
          sx={{ color: "#2e7d32", textTransform: "none" }}
          onClick={() => toggleVisbility("SCHEMA")}
        >
          Schema
        </Button>
        <Button
          variant="text"
          sx={{ color: "#2e7d32", textTransform: "none" }}
          onClick={() => toggleVisbility("DEPENDENCIES")}
        >
          Dependencies
        </Button>
        <Button
          variant="text"
          sx={{ color: "#2e7d32", textTransform: "none" }}
          onClick={() => toggleVisbility("EXAMPLE")}
        >
          Example
        </Button>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={9}
        sx={{
          my: 4,
          padding: 2,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          "& > *": {
            margin: "2px",
          },
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            <b>Group:</b>
          </Typography>
          <Typography variant="body2">kms.aws.signavio.cloud</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            <b>Version:</b>
          </Typography>
          <Typography variant="body2">v1alpha1</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            <b>Kind:</b>
          </Typography>
          <Typography variant="body2">CKey</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            <b>Documentation:</b>
          </Typography>
          <Link
            href="https://github.com/signavio/crossplane-compositions/blob/main/compositions/kms/README.md"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#2e7d32",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            User Guide
          </Link>
        </Box>
      </Stack>
      {/* <Divider /> */}
      {isExample && (
        <Fragment>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            <pre>{examples.generate_kms()}</pre>
          </Typography>
        </Fragment>
      )}
      {isDependencies && (
        <Fragment>
          <TableContainer>
            <Table
              sx={{
                tableLayout: "auto",
                border: "1px solid rgba(224, 224, 224, 1)",
                "& .MuiTableCell-root": {
                  border: "none",
                },
              }}
              aria-label="simple table"
            >
              <TableHead sx={{ "background-color": "white" }}>
                <TableRow>
                  <TableCell
                    sx={{ width: 420, backgroundColor: "white" }}
                    align="left"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ width: 420, backgroundColor: "white" }}
                    align="left"
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{ width: 420, backgroundColor: "white" }}
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      <ThemeProvider theme={typographyTheme}>
                        <Typography  sx={{ color: "#2e7d32"}}>{row.type}</Typography>
                        </ThemeProvider>
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "white" }} align="left">
                      {row.version}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
      {isSchema && (
        <Fragment>
          <Generate_tree crdData={crdData}></Generate_tree>
        </Fragment>
      )}
    </div>
  );
};

export default App;
