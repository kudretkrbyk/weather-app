# weather-app

Bu projemde OpenWeather API'sini kullanarak güncel hava durumu bilgilerini gösteren bir uygulama yaptım. 
UseState, useEffect, useCallback ve özel hooklar gibi React fonksiyonel bileşenleri ve hooklarını kullandım.
Her açılışta yeniden API isteği yapılmaması ve kullanıcının hızlıca son baktığı bilgileri görebilmesi amacıyla localStoreage ile veri ön belleklemesi kullandım.
Bileşenlerin gereksiz yere yeniden render edilmesini önleyerek performansı optimize etmek için React.memo kullandım.
Kullanıcının mevcut konumuna göre hava durumu verilerini almak için Geolocation API'sini uyguladım.
Veri yönetimi için redux kullandım. 
Hava durumu koşullarına göre değişen dinamik SVG ikonlarını entegre ettim.
Koyu ve açık mod olmak üzere iki ayrı şekilde tasarım gerçekleştirdim. 
Tailwind css kullandım ve projeyi responsive olarak tasarladım. 


In this project, I made an application that displays current weather information using the OpenWeather API. 
I used React functional components and hooks like useState, useEffect, useCallback and custom hooks.
I used data caching with localStoreage to avoid making a new API request at every startup and to allow the user to quickly see the last viewed information.
I used React.memo to optimize performance by preventing unnecessary re-rendering of components.
I implemented Geolocation API to get weather data based on user's current location.
I used redux for data management. 
I integrated dynamic SVG icons that change according to weather conditions.
I designed it in two different ways: dark and light mode. 
I used Tailwind css and designed the project responsively.


#React hashtag#JavaScript hashtag#Frontend hashtag#Responsive hashtag#OpenWeatherAPI hashtag#TailwindCSS hashtag#Redux hashtag#LocalStorage hashtag#memoization


![Demo GIF](https://github.com/kudretkrbyk/weather-app/blob/main/weather-app/1.gif)
![Demo GIF](https://github.com/kudretkrbyk/weather-app/blob/main/weather-app/2.gif)