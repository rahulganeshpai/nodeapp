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

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
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

const BorderedTreeView = ({ crdData }) => {
  console.log(crdData);
  const [isSchema, setIsSchema] = useState(true);
  const [isExample, setIsExample] = useState(false);
  const [isDependencies, setIsDependencies] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
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
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={9}
        sx={{
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
      <br />
      <Divider />
      <br />
      <Stack spacing={2} direction="row">
        <Button
          variant="text"
          sx={{ color: "#2e7d32" }}
          onClick={() => toggleVisbility("SCHEMA")}
        >
          SCHEMA
        </Button>
        <Button
          variant="text"
          sx={{ color: "#2e7d32" }}
          onClick={() => toggleVisbility("DEPENDENCIES")}
        >
          DEPENDENCIES
        </Button>
        <Button
          variant="text"
          sx={{ color: "#2e7d32" }}
          onClick={() => toggleVisbility("EXAMPLE")}
        >
          EXAMPLE
        </Button>
      </Stack>
      <br />
      {isExample && (
        <Fragment>
          <br />
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            <pre>{examples.generate_kms()}</pre>
          </Typography>
          <br />
          <br />
        </Fragment>
      )}
      {isDependencies && (
        <Fragment>
          <br />
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
          <br />
          <br />
        </Fragment>
      )}
      {isSchema && (
        <Fragment>
          <br />
          <SimpleTreeView
            aria-label="customized"
            defaultExpandedItems={["1", "3"]}
            slots={{
              expandIcon: ExpandIcon,
              collapseIcon: CollapseIcon,
              endIcon: EndIcon,
            }}
            sx={{
              overflowX: "auto",
              minHeight: 270,
              flexGrow: 1,
            }}
          >
            <CustomTreeItem
              itemId="43439"
              label={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography>spec</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        padding: "1px 8px",
                        fontSize: "0.65rem",
                      }}
                    >
                      Object
                    </Button>
                  </Box>
                </Box>
              }
            >
              <Box sx={{ marginY: 2 }}>
                Defines the desired state of the Resource
              </Box>
              <CustomTreeItem
                itemId="43433"
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginY: 1,
                    }}
                  >
                    <Typography>providerConfigRef</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          padding: "1px 8px",
                          fontSize: "0.65rem",
                        }}
                      >
                        Object
                      </Button>
                    </Box>
                  </Box>
                }
              >
                <Box sx={{ marginY: 2 }}>
                  Specifies how the provider creates, observes, updates, and
                  deletes resources
                </Box>
                <CustomTreeItem
                  itemId="43436"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginY: 1,
                      }}
                    >
                      <Typography>aws</Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{
                            color: "white", // Text color, adjust for contrast
                            padding: "1px 8px",
                            fontSize: "0.65rem",
                          }}
                        >
                          String
                        </Button>
                      </Box>
                    </Box>
                  }
                >
                  <Box sx={{ marginY: 2 }}>Provider name for AWS</Box>
                </CustomTreeItem>
              </CustomTreeItem>
              <CustomTreeItem
                itemId="3"
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginY: 1,
                    }}
                  >
                    <Typography>resourceConfig</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#A9A9A9",
                          color: "white", // Text color, adjust for contrast
                          padding: "1px 8px",
                          fontSize: "0.65rem",
                          "&:hover": {
                            backgroundColor: "#A9A9A9", // Slightly darker yellow on hover
                          },
                        }}
                      >
                        Required
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          padding: "1px 8px",
                          fontSize: "0.65rem",
                        }}
                      >
                        Object
                      </Button>
                    </Box>
                  </Box>
                }
              >
                <Box sx={{ marginY: 2 }}>
                  ResourceConfig defines the general properties of this AWS
                  resource.
                </Box>
                <CustomTreeItem
                  itemId="29292"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginY: 1,
                      }}
                    >
                      <Typography>tag</Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            padding: "1px 8px",
                            fontSize: "0.65rem",
                          }}
                        >
                          Object
                        </Button>
                      </Box>
                    </Box>
                  }
                >
                  <Box sx={{ marginY: 2 }}>Key-value map of resource tags.</Box>
                </CustomTreeItem>
              </CustomTreeItem>
            </CustomTreeItem>
            <br />
            <Divider />
            <br />
            <CustomTreeItem
              itemId="43430"
              label={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography>status</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        padding: "1px 8px",
                        fontSize: "0.65rem",
                      }}
                    >
                      Object
                    </Button>
                  </Box>
                </Box>
              }
            >
              <Box sx={{ marginY: 2 }}>
                A Status represents the observed state.
              </Box>
              <CustomTreeItem
                itemId="12112"
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginY: 1,
                    }}
                  >
                    <Typography>KeyArn</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{
                          color: "white", // Text color, adjust for contrast
                          padding: "1px 8px",
                          fontSize: "0.65rem",
                        }}
                      >
                        String
                      </Button>
                    </Box>
                  </Box>
                }
              >
                <Box sx={{ marginY: 2 }}>KMS Key ARN.</Box>
              </CustomTreeItem>
              <CustomTreeItem
                itemId="4343"
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginY: 1,
                    }}
                  >
                    <Typography>KeyAlias</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{
                          color: "white", // Text color, adjust for contrast
                          padding: "1px 8px",
                          fontSize: "0.65rem",
                        }}
                      >
                        String
                      </Button>
                    </Box>
                  </Box>
                }
              >
                <Box sx={{ marginY: 2 }}>KMS Key Alias.</Box>
              </CustomTreeItem>
            </CustomTreeItem>
          </SimpleTreeView>
        </Fragment>
      )}
      <br />
      <br />
    </div>
  );
};

export default BorderedTreeView;
