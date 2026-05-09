<template>
  <div>
    <nav>
      <span class="brand">Blog</span>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/search">Search</NuxtLink>
    </nav>

    <div class="container">
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>

      <div v-if="post" class="post-full">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          By {{ post.author?.name ?? 'Unknown' }}
          <span class="badge">{{ post.category?.name ?? 'Uncategorised' }}</span>
        </div>

        <div class="post-content">
          <div v-for="(block, i) in post.content" :key="i">
            <p v-if="block.type === 'paragraph'">
              {{ block.children.map(c => c.text).join('') }}
            </p>
            <h2 v-else-if="block.type === 'heading' && block.level === 2">
              {{ block.children.map(c => c.text).join('') }}
            </h2>
            <h3 v-else-if="block.type === 'heading' && block.level === 3">
              {{ block.children.map(c => c.text).join('') }}
            </h3>
            <ul v-else-if="block.type === 'list' && block.format === 'unordered'">
              <li v-for="(item, j) in block.children" :key="j">
                {{ item.children.map(c => c.text).join('') }}
              </li>
            </ul>
            <ol v-else-if="block.type === 'list' && block.format === 'ordered'">
              <li v-for="(item, j) in block.children" :key="j">
                {{ item.children.map(c => c.text).join('') }}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="no-results">Post not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data } = await useFetch(
  `${config.public.strapiUrl}/api/posts?populate[author]=true&populate[category]=true`
)

const post = computed(() => data.value?.data ?? null)
</script>