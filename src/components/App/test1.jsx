import React from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AddBoxRoundedIcon from "@mui/icons-material/ControlPoint";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import yaml from 'js-yaml';

// YAML string to object.
const yamlContent = `
schema:
  openAPIV3Schema:
    properties:
      spec:
        description: Defines the desired state of the Resource
        properties:
          providerConfigRef:
            description: Specifies how the provider creates, observes, updates, and deletes resources.
            type: object
            properties:
              aws:
                description: Provider name for AWS
                type: string
          resourceConfig:
            description: ResourceConfig defines the general properties of this AWS resource.
            properties:
              tags:
                additionalProperties:
                  type: string
                description: Key-value map of resource tags.
                type: object
            type: object
        required:
          - resourceConfig
        type: object
      status:
        description: A Status represents the observed state.
        properties:
          KeyArn:
            description: KMS Key ARN.
            type: string
          KeyAlias:
            description: KMS Key Alias.
            type: string
        type: object
    type: object`;

const schemaData = yaml.load(yamlContent);

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .MuiTreeItem-content`]: {
    padding: theme.spacing(0.5, 1),
  },
}));

const ExpandIcon = () => <AddBoxRoundedIcon sx={{ opacity: 0.8 }} />;
const CollapseIcon = () => <IndeterminateCheckBoxRoundedIcon sx={{ opacity: 0.8 }} />;
const EndIcon = () => <DisabledByDefaultRoundedIcon sx={{ opacity: 0.3 }} />;

const TypeBadgeButton = ({ label }) => {
  return (
    <Box
      sx={{
        padding: "2px 4px",
        borderRadius: "3px",
        backgroundColor: label === "Object" ? "#1976d2" : "#2e7d32",
        color: "white",
        fontSize: "0.7rem",
      }}
    >
      {label}
    </Box>
  );
};

// Recursive tree item generator
const generateTreeItems = (data, parentId = '') => {
  return Object.keys(data).map((key, index) => {
    const itemId = `${parentId}-${key}-${index}`;
    const node = data[key];
    const type = node.properties ? "Object" : node.type;
    return (
      <CustomTreeItem
        key={itemId}
        itemId={itemId}
        label={
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography>{key}</Typography>
            {type && <TypeBadgeButton label={type} />}
          </Box>
        }
      >
        {node.description && <Box sx={{ mt: 1, mb: 2 }}>{node.description}</Box>}
        {node.properties && generateTreeItems(node.properties, itemId)}
      </CustomTreeItem>
    );
  });
};

const GenerateTree = () => {
  const { properties } = schemaData.schema.openAPIV3Schema;
  return (
    <SimpleTreeView
      aria-label="customized"
      defaultExpandedItems={["-spec-0", "-status-1"]}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        endIcon: EndIcon,
      }}
      sx={{ overflowX: "auto", minHeight: 270 }}
    >
      {generateTreeItems(properties)}
    </SimpleTreeView>
  );
};

export default GenerateTree;


// const Generate_tree = ({crdData}) => {
//   // console.log(crdData);
//   const {spec,status} = crdData.spec.versions[0].schema.openAPIV3Schema.properties
//   console.log(spec);
//   // console.log(status);

//   const generate_status = () => {
//     for (let i in spec) {
//       if (i != "type")
//       console.log(i);
//     }
//   }

//   console.log(generate_status())

//   return (
//     <SimpleTreeView
//     aria-label="customized"
//     defaultExpandedItems={["1", "3"]}
//     slots={{
//       expandIcon: ExpandIcon,
//       collapseIcon: CollapseIcon,
//       endIcon: EndIcon,
//     }}
//     sx={{
//       overflowX: "auto",
//       minHeight: 270,
//       flexGrow: 1,
//     }}
//   >
//     <CustomTreeItem
//       itemId="43439"
//       label={
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <Typography>spec</Typography>
//           <Box sx={{ display: "flex", gap: 1 }}>
//             <TypeBadgeButton label="Object" />
//           </Box>
//         </Box>
//       }
//     >
//       <Box sx={{ marginY: 2 }}>
//         Defines the desired state of the Resource
//       </Box>
//       <CustomTreeItem
//         itemId="43433"
//         label={
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//               marginY: 1,
//             }}
//           >
//             <Typography>providerConfigRef</Typography>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <TypeBadgeButton label="Object" />
//             </Box>
//           </Box>
//         }
//       >
//         <Box sx={{ marginY: 2 }}>
//           Specifies how the provider creates, observes, updates, and
//           deletes resources
//         </Box>
//         <CustomTreeItem
//           itemId="43436"
//           label={
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 width: "100%",
//                 marginY: 1,
//               }}
//             >
//               <Typography>aws</Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <TypeBadgeButton label="String" color="success" />
//               </Box>
//             </Box>
//           }
//         >
//           <Box sx={{ marginY: 2 }}>Provider name for AWS</Box>
//         </CustomTreeItem>
//       </CustomTreeItem>
//       <CustomTreeItem
//         itemId="3"
//         label={
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//               marginY: 1,
//             }}
//           >
//             <Typography>resourceConfig</Typography>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <TypeBadgeButton label="Required" />
//               <TypeBadgeButton label="Object" />
//             </Box>
//           </Box>
//         }
//       >
//         <Box sx={{ marginY: 2 }}>
//           ResourceConfig defines the general properties of this AWS
//           resource.
//         </Box>
//         <CustomTreeItem
//           itemId="29292"
//           label={
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 width: "100%",
//                 marginY: 1,
//               }}
//             >
//               <Typography>tag</Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <TypeBadgeButton label="Object" />
//               </Box>
//             </Box>
//           }
//         >
//           <Box sx={{ marginY: 2 }}>Key-value map of resource tags.</Box>
//         </CustomTreeItem>
//       </CustomTreeItem>
//     </CustomTreeItem>
//     <br />
//     <Divider />
//     <br />
//     <CustomTreeItem
//       itemId="43430"
//       label={
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <Typography>status</Typography>
//           <Box sx={{ display: "flex", gap: 1 }}>
//             <TypeBadgeButton label="Object" />
//           </Box>
//         </Box>
//       }
//     >
//       <Box sx={{ marginY: 2 }}>
//         A Status represents the observed state.
//       </Box>
//       <CustomTreeItem
//         itemId="12112"
//         label={
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//               marginY: 1,
//             }}
//           >
//             <Typography>KeyArn</Typography>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <TypeBadgeButton label="String" color="success" />
//             </Box>
//           </Box>
//         }
//       >
//         <Box sx={{ marginY: 2 }}>KMS Key ARN.</Box>
//       </CustomTreeItem>
//       <CustomTreeItem
//         itemId="4343"
//         label={
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//               marginY: 1,
//             }}
//           >
//             <Typography>KeyAlias</Typography>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <TypeBadgeButton label="String" color="success" />
//             </Box>
//           </Box>
//         }
//       >
//         <Box sx={{ marginY: 2 }}>KMS Key Alias.</Box>
//       </CustomTreeItem>
//     </CustomTreeItem>
//   </SimpleTreeView>
//   )
// };