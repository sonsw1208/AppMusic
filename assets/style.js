
// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const PlAYER_STORAGE_KEY = "F8_PLAYER";

// const player = $(".player");
// const cd = $(".cd");
// const heading = $("header h2");
// const cdThumb = $(".cd-thumb");
// const audio = $("#audio");
// const playBtn = $(".btn-toggle-play");
// const progress = $("#progress");
// const prevBtn = $(".btn-prev");
// const nextBtn = $(".btn-next");
// const randomBtn = $(".btn-random");
// const repeatBtn = $(".btn-repeat");
// const playlist = $(".playlist");

// const app = {
//   currentIndex: 0,
//   isPlaying: false,
//   isRandom: false,
//   isRepeat: false,
//   config: {},
//   // (1/2) Uncomment the line below to use localStorage
//   // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
//   songs: [
//     {
//       name: "Âm thầm bên em",
//       singer: "SƠN TÙNG MTP",
//       path: "./assets/Linkmp3/song1_amthambenem.mp3",
//       image: "./assets/Linkimg/song1_img.jpg"
//     },
//     {
//       name: "Vì mẹ anh bắt chia tay",
//       singer: "MIU LÊ x KARIK x CHÂU ĐĂNG KHOA",
//       path: "./assets/Linkmp3/song2_vimeanhbatchiatay.mp3",
//       image:
//         "./assets/Linkimg/song2_img.jpg"
//     },
//     {
//       name: "Vài câu nói có khiến người thay đổi",
//       singer: "GREY D x TLINH ",
//       path:
//         "./assets/Linkmp3/song3_vaicaunoicokhiennguoithaydoi.mp3",
//       image: "./assets/Linkimg/song3_img.jpg"
//     },
//   ],
//   setConfig: function (key, value) {
//     this.config[key] = value;
//     // (2/2) Uncomment the line below to use localStorage
//     // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
//   },
//   render: function () {
//     const htmls = this.songs.map((song, index) => {
//       return `
//                         <div class="song ${
//                           index === this.currentIndex ? "active" : ""
//                         }" data-index="${index}">
//                             <div class="thumb"
//                                 style="background-image: url('${song.image}')">
//                             </div>
//                             <div class="body">
//                                 <h3 class="title">${song.name}</h3>
//                                 <p class="author">${song.singer}</p>
//                             </div>
//                             <div class="option">
//                                 <i class="fas fa-ellipsis-h"></i>
//                             </div>
//                         </div>
//                     `;
//     });
//     playlist.innerHTML = htmls.join("");
//   },
//   defineProperties: function () {
//     Object.defineProperty(this, "currentSong", {
//       get: function () {
//         return this.songs[this.currentIndex];
//       }
//     });
//   },
//   handleEvents: function () {
//     const _this = this;
//     const cdWidth = cd.offsetWidth;

//     // Xử lý CD quay / dừng
//     // Handle CD spins / stops
//     const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
//       duration: 10000, // 10 seconds
//       iterations: Infinity
//     });
//     cdThumbAnimate.pause();

//     // Xử lý phóng to / thu nhỏ CD
//     // Handles CD enlargement / reduction
//     document.onscroll = function () {
//       const scrollTop = window.scrollY || document.documentElement.scrollTop;
//       const newCdWidth = cdWidth - scrollTop;

//       cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
//       cd.style.opacity = newCdWidth / cdWidth;
//     };

//     // Xử lý khi click play
//     // Handle when click play
//     playBtn.onclick = function () {
//       if (_this.isPlaying) {
//         audio.pause();
//       } else {
//         audio.play();
//       }
//     };

//     // Khi song được play
//     // When the song is played
//     audio.onplay = function () {
//       _this.isPlaying = true;
//       player.classList.add("playing");
//       cdThumbAnimate.play();
//     };

//     // Khi song bị pause
//     // When the song is pause
//     audio.onpause = function () {
//       _this.isPlaying = false;
//       player.classList.remove("playing");
//       cdThumbAnimate.pause();
//     };

//     // Khi tiến độ bài hát thay đổi
//     // When the song progress changes
//     audio.ontimeupdate = function () {
//       if (audio.duration) {
//         const progressPercent = Math.floor(
//           (audio.currentTime / audio.duration) * 100
//         );
//         progress.value = progressPercent;
//       }
//     };

//     // Xử lý khi tua song
//     // Handling when seek
//     progress.onchange = function (e) {
//       const seekTime = (audio.duration / 100) * e.target.value;
//       audio.currentTime = seekTime;
//     };

//     // Khi next song
//     // When next song
//     nextBtn.onclick = function () {
//       if (_this.isRandom) {
//         _this.playRandomSong();
//       } else {
//         _this.nextSong();
//       }
//       audio.play();
//       _this.render();
//       _this.scrollToActiveSong();
//     };

//     // Khi prev song
//     // When prev song
//     prevBtn.onclick = function () {
//       if (_this.isRandom) {
//         _this.playRandomSong();
//       } else {
//         _this.prevSong();
//       }
//       audio.play();
//       _this.render();
//       _this.scrollToActiveSong();
//     };

//     // Xử lý bật / tắt random song
//     // Handling on / off random song
//     randomBtn.onclick = function (e) {
//       _this.isRandom = !_this.isRandom;
//       _this.setConfig("isRandom", _this.isRandom);
//       randomBtn.classList.toggle("active", _this.isRandom);
//     };

//     // Xử lý lặp lại một song
//     // Single-parallel repeat processing
//     repeatBtn.onclick = function (e) {
//       _this.isRepeat = !_this.isRepeat;
//       _this.setConfig("isRepeat", _this.isRepeat);
//       repeatBtn.classList.toggle("active", _this.isRepeat);
//     };

//     // Xử lý next song khi audio ended
//     // Handle next song when audio ended
//     audio.onended = function () {
//       if (_this.isRepeat) {
//         audio.play();
//       } else {
//         nextBtn.click();
//       }
//     };

//     // Lắng nghe hành vi click vào playlist
//     // Listen to playlist clicks
//     playlist.onclick = function (e) {
//       const songNode = e.target.closest(".song:not(.active)");

//       if (songNode || e.target.closest(".option")) {
//         // Xử lý khi click vào song
//         // Handle when clicking on the song
//         if (songNode) {
//           _this.currentIndex = Number(songNode.dataset.index);
//           _this.loadCurrentSong();
//           _this.render();
//           audio.play();
//         }

//         // Xử lý khi click vào song option
//         // Handle when clicking on the song option
//         if (e.target.closest(".option")) {
//         }
//       }
//     };
//   },
//   scrollToActiveSong: function () {
//     setTimeout(() => {
//       $(".song.active").scrollIntoView({
//         behavior: "smooth",
//         block: "nearest"
//       });
//     }, 300);
//   },
//   loadCurrentSong: function () {
//     heading.textContent = this.currentSong.name;
//     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
//     audio.src = this.currentSong.path;
//   },
//   loadConfig: function () {
//     this.isRandom = this.config.isRandom;
//     this.isRepeat = this.config.isRepeat;
//   },
//   nextSong: function () {
//     this.currentIndex++;
//     if (this.currentIndex >= this.songs.length) {
//       this.currentIndex = 0;
//     }
//     this.loadCurrentSong();
//   },
//   prevSong: function () {
//     this.currentIndex--;
//     if (this.currentIndex < 0) {
//       this.currentIndex = this.songs.length - 1;
//     }
//     this.loadCurrentSong();
//   },
//   playRandomSong: function () {
//     let newIndex;
//     do {
//       newIndex = Math.floor(Math.random() * this.songs.length);
//     } while (newIndex === this.currentIndex);

//     this.currentIndex = newIndex;
//     this.loadCurrentSong();
//   },
//   start: function () {
//     // Gán cấu hình từ config vào ứng dụng
//     // Assign configuration from config to application
//     this.loadConfig();

//     // Định nghĩa các thuộc tính cho object
//     // Defines properties for the object
//     this.defineProperties();

//     // Lắng nghe / xử lý các sự kiện (DOM events)
//     // Listening / handling events (DOM events)
//     this.handleEvents();

//     // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
//     // Load the first song information into the UI when running the app
//     this.loadCurrentSong();

//     // Render playlist
//     this.render();

//     // Hiển thị trạng thái ban đầu của button repeat & random
//     // Display the initial state of the repeat & random button
//     randomBtn.classList.toggle("active", this.isRandom);
//     repeatBtn.classList.toggle("active", this.isRepeat);
//   }
// };

// app.start();

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cd = $('.cd')
const heading = $('h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playbtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextbtn = $('.btn-next')
const prevbtn = $('.btn-prev')
const ramdombtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
  currentindex : 1,
  isplaying : false,
  isRamdom : false,
  isRepeat : false,
  songs : [
    {
      linksong : "./assets/Linkmp3/song1_amthambenem.mp3",
      linkimg : "./assets/Linkimg/song1_img.jpg",
      namesong : "ÂM THẦM BÊN EM",
      singer : "SƠN TÙNG - MTP"
    },
    {
      linksong : "./assets/Linkmp3/song2_vimeanhbatchiatay.mp3",
      linkimg : "./assets/Linkimg/song2_img.jpg",
      namesong : "VÌ MẸ ANH BẮT CHIA TAY",
      singer : "MIU LÊ x KARIK x CHÂU ĐĂNG KHOA"
    },
    {
      linksong : "./assets/Linkmp3/song3_vaicaunoicokhiennguoithaydoi.mp3",
      linkimg : "./assets/Linkimg/song3_img.jpg",
      namesong : "VÀI CÂU NÓI CÓ KHIẾN NGƯỜI THAY ĐỔI",
      singer : "GREY D x TLINH"
    },
    {
      linksong : "./assets/Linkmp3/song4_daucoloilam.mp3",
      linkimg : "./assets/Linkimg/song4_img.jpg",
      namesong : "DẪU CÓ LỖI LẦM",
      singer : "August Đỗ Hải Đăng cover"
    },
    {
      linksong : "./assets/Linkmp3/song5_lamgicoaithuongem.mp3",
      linkimg : "./assets/Linkimg/song5_img.jpg",
      namesong : "LÀM GÌ CÓ AI THƯƠNG EM",
      singer : "Tóc Tiên x Touliver x $ONDAY"
    },
    {
      linksong : "./assets/Linkmp3/song6_anhdanhroinguoiyeunay.mp3",
      linkimg : "./assets/Linkimg/song6_img.jpg",
      namesong : "ANH ĐÁNH RƠI NGƯỜI YÊU NÀY",
      singer : "Andiez ft. AMEE"
    },
    {
      linksong : "./assets/Linkmp3/song7_thoiquen.mp3",
      linkimg : "./assets/Linkimg/song7_img.jpg",
      namesong : "THÓI QUEN",
      singer : "HOÀNG DŨNG, GDUCKY, MÀU NƯỚC BAND"
    },
  ],
  rendersongs : function(){
    const song = this.songs.map((song,index) => {
      return `
      <div class="song ${index === this.currentindex ? 'active' : ''}" serial = ${index}>
          <div class="thumb"
              style="background-image: url('${song.linkimg}')">
          </div>
          <div class="body">
              <h3 class="title">${song.namesong}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>`
    })
    playlist.innerHTML = song.join('')
  },
  handleevents : function(){
    const cdwidth = cd.offsetWidth
    _this = this

    // Xử lý zoom
    document.onscroll = function(){
      var scrolltop = document.documentElement.scrollTop || window.scrollY
      var newcdwidth = cdwidth - scrolltop
      cd.style.width = newcdwidth > 0 ? newcdwidth + 'px' : 0
      cd.style.opacity = newcdwidth / cdwidth
    }

    // Khi ấn nút play 
    playbtn.onclick = function(){      
      if(_this.isplaying){
        audio.pause()
      }
      else{
        audio.play()
      }
    }

    // Khi đang play 
    audio.onplay = function(){
      _this.isplaying = true
        player.classList.add('playing')
        cdThumbAnimate.play()
    }
    // Khi pause
    audio.onpause = function(){
      _this.isplaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    // CD quay
    const cdThumbAnimate = cdThumb.animate(
      [
        { transform: 'rotate(0)' },
        { transform: 'rotate(360deg)'}
      ],
      {
        duration: 10000,
        iterations: Infinity
      }
    )
    cdThumbAnimate.pause()

    // Khi bài hát đang chạy
    audio.ontimeupdate = function(){
      const progresspercent = Math.floor((audio.currentTime / audio.duration ) * 100)
      progress.value = progresspercent
    }

    progress.oninput = function(e){
      const crtime = audio.duration * e.target.value / 100
      audio.currentTime = crtime
    }

    // Khi click vào nút chuyển tiếp
    nextbtn.onclick = function(){
      if(_this.isRamdom){
        _this.playramdom()
      }
      else{
        _this.nextsong()
      }
      audio.play()
      _this.rendersongs()
    }

    // Khi click vào nút lùi lại
    prevbtn.onclick = function(){
      if(_this.isRamdom){
        _this.playramdom()
      }
      else{
        _this.prevsong()
      }
      audio.play()
      _this.rendersongs()
    }

    //ramdom song
    ramdombtn.onclick = function(){
      _this.isRamdom = !_this.isRamdom
      ramdombtn.classList.toggle('active')
    }

    // Khi mà chạy xong bài hát
    audio.onended = function(){
      if(_this.isRepeat){
        audio.play()
      }
      else{
        nextbtn.click()
      }
    }

    // Khi ở trạng thái repeat
    repeatBtn.onclick = function(){
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active')
    }

    // Lựa chọn bài hát để phát
    playlist.onclick = function(e){
      const fowardsong = e.target.closest('.song:not(.active)')
      if(fowardsong || e.target.closest('.option') ){
        if(fowardsong){
          const serial =Number(fowardsong.getAttribute('serial'))
          _this.currentindex = serial
          _this.loadcurrentsong()
          _this.rendersongs()
          audio.play()
        }
      }
    }

  },

  playramdom : function(){
    let newindex
    do {
      newindex = Math.floor(Math.random() * this.songs.length)
    }while( newindex == this.currentindex)
    this.currentindex = newindex
    this.loadcurrentsong()
  },

  defineProperties : function(){
    Object.defineProperty(this,'currentsong',{
      get:function(){
        return this.songs[this.currentindex]
      }
    })
  },
  loadcurrentsong :function(){
    heading.textContent = this.currentsong.namesong
    cdThumb.style.backgroundImage = `url('${this.currentsong.linkimg}')`
    audio.src = this.currentsong.linksong
  },

  //Khi ấn chuyển tiếp song
  nextsong : function(){
    this.currentindex++
    if(this.currentindex >= this.songs.length){
      this.currentindex = 0
    }
    this.loadcurrentsong()
    _this.scrollToActiveSong()
  },

  // Khi ấn lùi lại
  prevsong : function(){
    this.currentindex--
    if(this.currentindex<0){
      this.currentindex = this.songs.length-1
    }
    this.loadcurrentsong()
    _this.scrollToActiveSong()
  },

  // scroll 
  scrollToActiveSong: function () {
    setTimeout (() => {
      $('.song.active').scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
    },300)
  },

  start : function(){
    // Định nghĩa các thuộc tính cho object
    this.defineProperties()

    // Xử lý các sự kiện
    this.handleevents()

    // Load bài hát hiện tại ra UI
    this.loadcurrentsong()
    // Render ra UI
    this.rendersongs()
  },
}

app.start()
