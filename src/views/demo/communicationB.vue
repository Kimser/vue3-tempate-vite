<template>
  <div class="music-list">
    <h1>Music Playlist</h1>
    <ul>
      <li v-for="track in tracks" :key="track.id" class="track-item">
        <button
          :class="{ active: currentTrack?.id === track.id }"
          @click="playMusic(track)"
        >
          {{ track.name }}
        </button>
      </li>
    </ul>

    <!-- 进度条 -->
    <div v-if="currentTrack?.url" class="progress-container relative">
      <span
        v-if="currentTrack.name"
        class="absolute left-50% transform-translate-x--50% bottom-20px"
      >
        {{ currentTrack?.name }}
      </span>
      <span>{{ formatTime(currentTime) }}</span>
      <progress :value="currentTime" :max="duration" />
      <span>{{ formatTime(duration) }}</span>
      <button class="!w-64px ml-10px" @click="togglePlay">
        {{ isPlaying ? "Pause" : "Play" }}
      </button>
    </div>

    <audio ref="audioPlayer" @timeupdate="updateProgress" @ended="onTrackEnd" />
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
const channel = ref<any>();

interface Track {
  id: number;
  name: string;
  url: string;
}

export default {
  setup() {
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
    ]);

    const currentTrack = ref<Track>();
    const audioPlayer = ref<HTMLAudioElement | null>(null);
    const currentTime = ref(0); // 当前播放时间
    const duration = ref(0); // 当前音频时长
    const isPlaying = ref(false); // 播放状态

    const playMusic = (track: Track) => {
      if (audioPlayer.value) {
        currentTrack.value = track;
        audioPlayer.value.src = track.url;
        audioPlayer.value.play();
        isPlaying.value = true;

        // 每次播放新音乐时重置进度
        currentTime.value = 0;
        console.log(currentTime);
        duration.value = 0;
      }
    };

    const updateProgress = () => {
      if (audioPlayer.value) {
        currentTime.value = audioPlayer.value.currentTime; // 当前时间
        duration.value = audioPlayer.value.duration || 0; // 总时长
      }
    };

    const onTrackEnd = () => {
      isPlaying.value = false; // 播放结束时，暂停状态
      const index = tracks.findIndex((t) => t.id === currentTrack.value!.id);
      if (currentTrack.value!.url && index < tracks.length - 1) {
        const track = tracks[index + 1];
        playMusic(track); // 自动播放下一首
      } else {
        currentTrack.value = {
          id: -1,
          name: "",
          url: "",
        }; // 播放结束
      }
    };
    // 播放或暂停
    const togglePlay = () => {
      if (audioPlayer.value) {
        if (isPlaying.value) {
          audioPlayer.value.pause();
        } else {
          audioPlayer.value.play();
        }
        isPlaying.value = !isPlaying.value;
      }
    };
    const onPlay = () => {
      isPlaying.value = true;
      if (audioPlayer.value) {
        audioPlayer.value.play();
      }
    };
    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    };

    onMounted(() => {
      if (audioPlayer.value) {
        audioPlayer.value.volume = 0.8; // 设置默认音量
      }
      channel.value = new BroadcastChannel("myChannel");
      channel.value.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data.id !== currentTrack.value?.id) {
          playMusic(data);
        }
        onPlay();
      };
    });
    onMounted(() => {
      const route = useRoute();
      const router = useRouter();
      const { query } = route as any;
      // 判断是否是新打开的标签页
      if (query.isNew === "1") {
        console.log(query);
        // 清空地址栏参数
        router.replace({ query: {} });
        playMusic(JSON.parse(query.track));
      }
    });
    onBeforeUnmount(() => {
      channel.value.close();
    });

    return {
      tracks,
      currentTrack,
      currentTime,
      duration,
      playMusic,
      updateProgress,
      onTrackEnd,
      formatTime,
      audioPlayer,
      togglePlay,
      isPlaying,
    };
  },
};
</script>

<style scoped>
.music-list {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
}

h1 {
  color: #333;
  text-align: center;
}

ul {
  padding: 0;
  list-style-type: none;
}

.track-item {
  margin: 10px 0;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #6200ea;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button.active {
  background-color: #3700b3;
}

button:hover {
  background-color: #5c00d2;
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

progress {
  flex: 1;
  height: 6px;
  margin: 0 10px;
  appearance: none;
  background-color: #ddd;
}

progress::-webkit-progress-bar {
  background-color: #ddd;
}

progress::-webkit-progress-value {
  background-color: #6200ea;
}

progress::-moz-progress-bar {
  background-color: #6200ea;
}

span {
  font-size: 14px;
  color: #333;
}
</style>
