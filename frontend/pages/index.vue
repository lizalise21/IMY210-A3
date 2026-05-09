<!-- Lizalise: u23587874 -->
 <template>
  <div>
    <nav>
      <span class="brand">Blog</span>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/search">Search</NuxtLink>
    </nav>

    <div class="container">
      <h1>Latest Posts</h1>

      <div class="filter-bar">
        <select v-model="selectedCategory">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div v-for="post in filteredPosts" :key="post.id" class="post-card">
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
const selectedCategory = ref('')

const config = useRuntimeConfig()
const { data } = await useFetch(
  `${config.public.strapiUrl}/api/posts?populate[author]=true&populate[category]=true`
)

const posts = computed(() => data.value?.data ?? [])

const categories = computed(() => [
  ...new Set(posts.value.map(p => p.category?.name).filter(Boolean))
])

const filteredPosts = computed(() =>
  selectedCategory.value
    ? posts.value.filter(p => p.category?.name === selectedCategory.value)
    : posts.value
)
</script>