<script setup lang="ts">
const tab2 = ref<any>(null);
const router = useRouter();

interface Track {
  id: number;
  name: string;
  url: string;
}
const tracks = reactive<Track[]>([
  {
    id: 1,
    name: "Sample Track 1",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    name: "Sample Track 2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    name: "Sample Track 3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    name: "Sample Track 4",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    name: "Sample Track 5",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: 6,
    name: "Sample Track 6",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: 7,
    name: "Sample Track 7",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: 8,
    name: "Sample Track 8",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: 9,
    name: "Sample Track 9",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: 10,
    name: "Sample Track 10",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
]);
const openWindow = (track: Track) => {
  // 如果标签页 2 已经存在且未关闭
  if (tab2.value && !tab2.value.closed) {
    // 激活标签页 2
    tab2.value.focus();
    const channel = new BroadcastChannel("myChannel");
    channel.postMessage(JSON.stringify(track));
    channel.close();
  } else {
    const target = router.resolve({
      path: "communicationB",
      query: { isNew: 1, track: JSON.stringify(track) },
    });
    // 如果标签页 2 不存在或已经关闭，则打开新的标签页
    tab2.value = window.open(target.href, "_blank");
  }
};
</script>

<template>
  <div class="music-list">
    <h1>Music Playlist</h1>
    <ul>
      <li
        v-for="track in tracks"
        :key="track.id"
        class="track-item"
        @click="openWindow(track)"
      >
        <span>{{ track.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.music-list {
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
  background: linear-gradient(145deg, #f0f4ff, #cfd9ff);
  border-radius: 20px;
  box-shadow:
    5px 5px 15px rgb(0 0 0 / 10%),
    -5px -5px 15px rgb(255 255 255 / 70%);
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  letter-spacing: 1px;
}

ul {
  padding: 0;
  list-style-type: none;
}

.track-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  background: #fff;
  border-radius: 12px;
  box-shadow:
    3px 3px 8px rgb(0 0 0 / 10%),
    -3px -3px 8px rgb(255 255 255 / 70%);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.track-item:hover {
  box-shadow:
    8px 8px 20px rgb(0 0 0 / 15%),
    -8px -8px 20px rgb(255 255 255 / 70%);
  transform: translateY(-5px);
}

span {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  letter-spacing: 0.5px;
}
</style>
