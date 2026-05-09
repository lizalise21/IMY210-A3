<template>
  <div>
    <nav>
      <span class="brand">Blog</span>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/search">Search</NuxtLink>
    </nav>

    <div class="container">
      <h1>Search Posts</h1>

      <div class="filter-bar">
        <input v-model="query" type="text" placeholder="Search by title or author..." />
      </div>

      <p v-if="results.length === 0 && query" class="no-results">No results found.</p>

      <div v-for="post in results" :key="post.id" class="post-card">
        <h2>
          <NuxtLink :to="`/post/${post.documentId}`">{{ post.title }}</NuxtLink>
        </h2>
        <div class="post-meta">
          By {{ post.author?.name ?? 'Unknown' }}
          <span class="badge">{{ post.category?.name ?? 'Uncategorised' }}</span>
        </div>
        <p class="post-snippet">{{ post.snippet }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const query = ref('')

const config = useRuntimeConfig()
const { data } = await useFetch(
  `${config.public.strapiUrl}/api/posts?populate[author]=true&populate[category]=true`
)

const posts = computed(() => data.value?.data ?? [])

const results = computed(() => {
  if (!query.value) return posts.value
  const q = query.value.toLowerCase()
  return posts.value.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.author?.name.toLowerCase().includes(q)
  )
})
</script>