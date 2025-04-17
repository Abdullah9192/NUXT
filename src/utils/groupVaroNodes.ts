import { VaroNodeGroup } from '~/types/VaroNode';
import type { VaroNode } from '~/types/VaroNode';

/**
 * Groups VaroNodes into VaroNodeGroups using their `groupId`.
 */
export function getVaroNodeGroups(nodes: VaroNode[]): VaroNodeGroup[] {
  const groupMap = new Map<string, VaroNodeGroup>();

  for (const node of nodes) {
    if (!node.groupId) continue;

    let group = groupMap.get(node.groupId);

    // Create new group if not present
    if (!group) {
      group = new VaroNodeGroup({
        id: node.groupId,
        name: node.name, // Could override with a display name map later
        visible: true,
        nodes: [],
      });
      groupMap.set(node.groupId, group);
    }

    group.nodes.push(node);

    // Assign the selected node ID if this one is marked as defaultForGroup
    if (node.defaultForGroup) {
      group.selectedNodeId = node.id;
    }
  }

  // Fallback: if no selectedNodeId is explicitly set, the class handles it in the constructor or getter
  return Array.from(groupMap.values());
}
