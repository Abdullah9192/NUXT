<script setup lang="ts">
import type { VaroNode } from '@/types/VaroNode';

const toast = useToast()

const props = defineProps<{ node: VaroNode }>();

const items = ref<DropdownMenuItem[]>([
    {
        label: 'Hide',
        icon: 'i-lucide-eye-off',
        onSelect(e: Event) {
            props.node.visible = false
        }
    },
    {
        label: 'Unhide',
        icon: 'i-lucide-eye',
        onSelect(e: Event) {
            props.node.visible = true
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
    title: `Launching ${props.node.name}`,
    description: 'Your wish is my command...',
    icon: "i-lucide-rocket",
    color: "success"
  })
}

</script>

<template>
    <div class="bg-(--ui-bg-elevated)/50 p-2.5 rounded-[calc(var(--ui-radius)*2)] relative overflow-hidden">
        
        <!-- hidden -->
        <div v-if="node.visible === false"
            class="-z-100 absolute top-0 left-0 w-full h-full text-(--ui-text-dimmed)/50
            bg-[size:10px_10px] 
            bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]">
        </div>

        <div class="flex gap-2 items-start w-full flex-nowrap">
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
                <UTooltip :text="node.description" :disabled="!node.description">
                    <h3 class="font-semibold">{{ node.name }}</h3>
                </UTooltip>

                <!-- Badges -->
                <div class="flex gap-1">
                    <UBadge v-if="node.status" class="rounded-sm" size="sm" :color="node.status.color" variant="subtle">
                        {{ node.status.name }}
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

    </div>
</template>


<!-- card horizontal / vertical -->