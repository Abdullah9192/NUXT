import { VaroNode } from "~/types/VaroNode";

export const dummyVaroNodes: VaroNode[] = [
  // 3ds Max
  new VaroNode({
    id: "uuid-3dsmax-2022",
    groupId: "3dsmax",
    name: "3ds Max 2022",
    category: "3D",
    icon: "./icons/3dsmax.svg",
    status: {
      name: "Deprecated",
      color: "error",
    },
  }),
  new VaroNode({
    id: "uuid-3dsmax-2023",
    groupId: "3dsmax",
    name: "3ds Max 2023",
    visible: false,
    category: "3D",
    icon: "./icons/3dsmax.svg"
  }),
  new VaroNode({
    id: "uuid-3dsmax-2024",
    groupId: "3dsmax",
    name: "3ds Max 2024",
    category: "3D",
    icon: "./icons/3dsmax.svg",
    defaultForGroup: true,
    description: "Latest stable version for all artists to use for production",
    status: {
      name: "Default",
      color: "neutral",
    },
  }),
  new VaroNode({
    id: "uuid-3dsmax-2025",
    groupId: "3dsmax",
    name: "3ds Max 2025",
    category: "3D",
    icon: "./icons/3dsmax.svg",
    status: {
      name: "Beta",
      color: "warning",
    },
  }),
  new VaroNode({
    id: "uuid-3dsmax-2026",
    groupId: "3dsmax",
    name: "3ds Max 2026",
    category: "3D",
    icon: "./icons/3dsmax.svg",
    description: "Testing"
  }),

  // Maya
  new VaroNode({
    id: "uuid-maya-2020",
    groupId: "maya",
    name: "Maya 2020",
    category: "3D",
    icon: "./icons/maya.svg"
  }),
  new VaroNode({
    id: "uuid-maya-2022",
    groupId: "maya",
    name: "Maya 2022",
    category: "3D",
    icon: "./icons/maya.svg"
  }),
  new VaroNode({
    id: "uuid-maya-2024",
    groupId: "maya",
    name: "Maya 2024",
    category: "3D",
    icon: "./icons/maya.svg",
    status: {
      name: "Beta",
      color: "warning",
    }
  }),

  // Blender
  new VaroNode({
    id: "uuid-blender-2022",
    groupId: "blender",
    name: "Blender 2022",
    category: "3D",
    icon: "./icons/blender.svg"
  }),
  new VaroNode({
    id: "uuid-blender-2024",
    groupId: "blender",
    name: "Blender 2024",
    category: "3D",
    icon: "./icons/blender.svg",
    status: {
      name: "Default",
      color: "info",
    }
  }),

  // Nuke
  new VaroNode({
    id: "uuid-nuke-13.1",
    groupId: "nuke",
    name: "Nuke 13.1",
    category: "Compositing",
    icon: "./icons/nuke.svg"
  }),
  new VaroNode({
    id: "uuid-nuke-14",
    groupId: "nuke",
    name: "Nuke 14 Beta",
    category: "Compositing",
    icon: "./icons/nuke.svg",
    status: {
      name: "Beta",
      color: "warning",
    }
  }),

  // Affinity Photo
  new VaroNode({
    id: "uuid-affinity-2",
    groupId: "affinity",
    name: "Affinity Photo 2",
    category: "2D",
    icon: "./icons/affinity.svg"
  }),

  // NIM
  new VaroNode({
    id: "uuid-nim-5.0",
    groupId: "nim",
    name: "NIM 5.0",
    category: "Pipeline",
    icon: "./icons/nim.svg"
  }),

  // Documentation
  new VaroNode({
    id: "uuid-docs",
    groupId: "docs",
    name: "Documentation",
    category: "Pipeline",
    icon: "./icons/nim.svg"
  })
];