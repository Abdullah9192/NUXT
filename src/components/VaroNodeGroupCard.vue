<script setup lang="ts">
import type { VaroNodeGroup } from '@/types/VaroNode';

const toast = useToast()

const props = defineProps<{ group: VaroNodeGroup }>();

const items = ref<DropdownMenuItem[]>([
    {
        label: 'Hide',
        icon: 'i-lucide-eye-off',
        onSelect(e: Event) {
            console.log(props.group.visible)
            props.group.visible = false;
            console.log(props.group.visible)
        }
    },
    {
        label: 'Unhide',
        icon: 'i-lucide-eye',
        onSelect(e: Event) {
            console.log(props.group.visible)
            props.group.visible = true;
            console.log(props.group.visible)
        }
    },
    {
        label: 'Edit',
        icon: 'i-lucide-pencil',
        onSelect(e: Event) {
            console.log('TOOD')
        }
    }
])

function handleExecuteClick() {
  console.log('Button clicked!');
  toast.add({
    title: `Launching ${props.group.selectedNode?.name}`,
    description: 'Your wish is my command...',
    icon: "i-lucide-rocket",
    color: "success"
  })
}

</script>

<template>
    <div class="bg-(--ui-bg-elevated)/50 p-2.5 rounded-[calc(var(--ui-radius)*2)] relative overflow-hidden">

        <!-- hidden -->
        <div v-if="group.visible === false"
            class="-z-100 absolute top-0 left-0 w-full h-full text-(--ui-text-dimmed)/50
            bg-[size:10px_10px] 
            bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]">
        </div>

        <!-- content -->
        <div v-if="group.selectedNode" class="flex gap-2 items-start w-full flex-nowrap">
            <!-- Action Button/Icon -->
            <div>
                <UButton 
                    @click="handleExecuteClick"
                    icon="i-lucide-box" 
                    variant="ghost" 
                    size="2xl" 
                    color="neutral" 
                    class="shrink-0 cursor-pointer">
                </UButton>
            </div>

            <!-- Title -->
            <div class="flex-grow space-y-1">
                <UTooltip :text="group.selectedNode.description" :disabled="!group.selectedNode.description">
                    <h3 v-if="group.nodes.length === 1" class="font-semibold">{{ group.selectedNode.name }}</h3>
                    <UButton v-else trailing-icon="i-lucide-chevron-down" variant="subtle" color="neutral" class="shrink-0 text-left w-full">
                        <span class="w-full">
                            {{ group.selectedNode.name }}
                        </span>
                    </UButton>
                </UTooltip>

                <!-- Badges -->
                <div class="flex gap-1">
                    <UBadge v-if="group.selectedNode.status" 
                        class="rounded-sm" 
                        size="sm" 
                        :color="group.selectedNode.status.color" 
                        variant="subtle">
                        {{ group.selectedNode.status.name }}
                    </UBadge>
                </div>
            </div>

            <!-- Menu/Button -->
            <div>
                <UDropdownMenu size="md" :items="items">
                    <UButton icon="i-lucide-ellipsis-vertical" variant="link" color="neutral" class="shrink-0">
                    </UButton>
                </UDropdownMenu>
            </div>
        </div>
        <div v-else>
            MISSING NODE
        </div>
    </div>
</template>


<!-- card horizontal / vertical -->