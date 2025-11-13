#Project_Description

Yeh mera ek simple-sa project hai jisme main Imgflip ki API use karke meme templates fetch karta hoon aur unhe clean, responsive grid me show karta hoon. Upar ek search bar bhi hai jisse tum naam type karo aur memes turant filter ho jaate hain. Pure flow front-end par hi chalta hai — bilkul seedha-sa setup.



#Workinggggg

Imgflip ki public API se meme templates laata hai.
Har meme ko image + title ke saath card grid me show karta hai.
Search bar se real-time filtering — koi delay nahi.



#API Details (simple & to-the-point)

Endpoint: [https://api.imgflip.com/get_memes](https://api.imgflip.com/get_memes)

API basically ek JSON bhejti hai jisme:

* success → bataata hai request sahi thi ya nahi.
* data.memes → saare meme templates ka array, jisme name, url, width, height jaise details hoti hain.


# Data fetch ka flow

Jab page load hota hai, `useEffect` ek GET request bhej deta hai. Agar sab theek raha to memes state update hota hai aur UI render ho jaata hai. Agar network issue ho, to error message dikh jaata hai.

```jsx
useEffect(() => {
  async function loadMemes() {
    setStatus('loading')
    const response = await fetch(MEME_API_URL)
    const payload = await response.json()
    // payload.data.memes → yahin se list aa jaati hai
  }
  loadMemes()
}, [])

Styling view

* `src/index.css`:- me Tailwind import hai (`@import "tailwindcss";`).
* Saara UI utility classes se style kiya — extra CSS likhne ki almost zaroorat nahi.


Scripts


npm run dev     # dev server
npm run build   # production build
npm run preview # local preview




* App sirf read-only data show karti hai.
* Agar API slow ho ya net issue aaye, loader/error UI handle kar leta hai.


