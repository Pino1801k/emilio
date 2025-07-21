// Elementos principales
const video = document.getElementById("introVideo");
const videoContainer = document.getElementById("videoContainer");
const invitationContainer = document.getElementById("invitationContainer");

const music1 = document.getElementById("bgMusic1");
const music2 = document.getElementById("bgMusic2");

// Función para detener todas las músicas y reiniciarlas
function stopAllMusic() {
  music1.pause();
  music1.currentTime = 0;
  music2.pause();
  music2.currentTime = 0;
}

// 🎵 Iniciar música 1 cuando el video comience a reproducirse
video.addEventListener("play", () => {
  stopAllMusic();
  music1.play().catch(err => {
    console.log("Error al reproducir música 1:", err);
  });
});

// 🎉 Cuando termina el video, mostrar invitación
video.addEventListener("ended", () => {
  videoContainer.classList.add("hidden");
  invitationContainer.classList.remove("hidden");
});

// Cuando termina música1, detenerla y empezar música2
music1.addEventListener("ended", () => {
  music1.pause();
  music1.currentTime = 0;

  // Evitar iniciar música2 si ya está sonando
  if (!music2.paused) return;

  music2.play().catch(err => {
    console.log("Error al reproducir música 2:", err);
  });
});

// ⏳ Contador regresivo (ajusta tu fecha y hora aquí)
const countdown = document.getElementById("countdown");
const eventDate = new Date("2025-08-20T14:00:00").getTime(); // 🗓️ Fecha del evento

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    countdown.innerHTML = "¡Ya comenzó la fiesta!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 📱 Habilitar reproducción de música al primer clic (para móviles)
document.addEventListener('click', () => {
  // No reproducir dos audios simultáneamente, solo reproduce la música correspondiente
  if (video.paused) {
    // Si el video ya terminó, intenta reproducir música2 si no está sonando
    if (music1.ended && music2.paused) {
      music2.play().catch(() => {});
    } else if (!music1.ended && music1.paused) {
      music1.play().catch(() => {});
    }
  } else {
    // Si video está reproduciéndose, inicia música1 si está pausada
    if (music1.paused) {
      music1.play().catch(() => {});
    }
  }
}, { once: true });
