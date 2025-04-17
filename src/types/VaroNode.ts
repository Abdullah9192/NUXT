export class VaroNodeGroup {
  id: string;
  name: string;
  visible: boolean;
  nodes: VaroNode[];
  selectedNodeId?: string;

  constructor(data: {
    id: string;
    name: string;
    visible?: boolean;
    nodes?: VaroNode[];
    selectedNodeId?: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.visible = data.visible ?? true;
    this.nodes = data.nodes ?? [];
    this.selectedNodeId = data.selectedNodeId ?? this.getDefaultNodeId();
  }

  /**
   * Returns the currently selected VaroNode, falling back to default or first node.
   */
  get selectedNode(): VaroNode | undefined {
    if (this.selectedNodeId) {
      const found = this.nodes.find(n => n.id === this.selectedNodeId);
      if (found) return found;
    }
    return this.nodes[0];
  }

  /**
   * Returns the first node marked defaultForGroup, or fallback to first.
   */
  private getDefaultNodeId(): string | undefined {
    const defaultNode = this.nodes.find(n => n.defaultForGroup);
    return defaultNode?.id ?? this.nodes[0]?.id;
  }
}

export class VaroNode {
  id: string;
  name: string;
  category: string;
  groupId: string;
  icon: string;
  visible?: boolean;
  defaultForGroup?: boolean;
  description?: string;
  status?: {
    name: string;
    color: string;
  };

  constructor(data: {
    id: string;
    name: string;
    category?: string;
    groupId?: string;
    icon?: string;
    visible?: boolean;
    defaultForGroup?: boolean;
    description?: string;
    status?: {
      name: string;
      color: string;
    };
  }) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category ?? 'Uncategorized';
    this.groupId = data.groupId ?? '';
    this.icon = data.icon ?? '';
    this.visible = data.visible ?? true;
    this.defaultForGroup = data.defaultForGroup ?? false;
    this.description = data.description;
    this.status = data.status;
  }
}