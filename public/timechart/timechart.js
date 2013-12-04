// DVSL Time Chart library. Version 2.1.0
// (c) 2013 - 2013 Data Visualization Software Lab
//
// http://datavisualizationsoftwarelab.com http://dvsl.co
//
//
// 3rd party software license acknowledgement:
// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com

(function(){
   
    var builtinImages = {
    "column.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAADICAYAAADsgBFkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUJFN0MzMThDOTJGMTFFMkIwNEFGNzY3QTBGQUEwRjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUJFN0MzMTlDOTJGMTFFMkIwNEFGNzY3QTBGQUEwRjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQkU3QzMxNkM5MkYxMUUyQjA0QUY3NjdBMEZBQTBGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQkU3QzMxN0M5MkYxMUUyQjA0QUY3NjdBMEZBQTBGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pptq3kYAAAEpSURBVHja7JoxDsIwDEWTqrDADEMnVtT7H4CJE7QjR2DKFKnGEQuqmEiTpuGl8kCHL/P97R8LrIiYFKcxiY6dfd5rHDR2EZhew9kZ6Emj0zhGAD81HnYGehmG4RZeTPr8evprf26WBv0sXuC0WxI0nDYUSiV3jwEdx/ErsJkkMkvJqONkwO37m0gkE5I5YxM7hyjeKhmjir/vPKYbDULxCike9o+O4RgquFeUwTFyw0yhAs+rc/vfntywJlSBS6MKVIGZFuYgtDRUQAVUZKOC4mWgoopVAVVwjUXHULGqNdHSG/Y8Bj1UMOhpkDqXG1SxYQdBFTgIv0uzg6y6g9B5WBN/bEZudVKBmXKNxaXRMUOooIwxUzim81BFlcXzCRL2AdglAHYvAQYAcMpYf9wvA84AAAAASUVORK5CYII=",
    "no-data-light.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABPCAYAAABWIbNMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIyQjVERERFNTYzMTFFMkFCQzA5QTIyQ0RFNjkyMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzIyQjVEREVFNTYzMTFFMkFCQzA5QTIyQ0RFNjkyMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjJCNUREQkU1NjMxMUUyQUJDMDlBMjJDREU2OTIxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MjJCNUREQ0U1NjMxMUUyQUJDMDlBMjJDREU2OTIxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqaQJv8AAA0dSURBVHja7FwLVJTHFV5w0YVdwAVUXFACCqiVl9IjEkTemAKmFhCDSQFBLIoHKb6NJ7WnNqipJoqJNTWa06MmimiaaMFXQFN8YagaFRFFLYLgCzHJgsuj34VZsq67sC9w18Occ8+/O/PPnTvff+fOvfPP/EZtbW2cpUuXcuRTdnY2R5WkqK6SxAWNA00CuYNcQI4gAYjP7vmR0U3QddBF0AlQKahFEVNV5VRHZuLJ5fRsMgH9BvQW6A2QhWxhv379GoyNjRu4XO49ekAtLS1mra2tfFx9Uewrc+sT0EHQTlCBMpB0mXoKGNKCFNAfQcMYCE8sLCyKBg0a9IOjo+M1V1fXapFI9BhFzSAJyIjJw62urhaWlZWJKisrR92/f9/t6dOnHgArHmVEt0DrQdtAPxsKMMQvFbQKZGNkZNQsFAoLXVxcjoWFhZ0xMzOrQz6BUU+dgko3K1FlLkCj4WUJsmpsbBx0+PDhX1+9ejWsvr7eD9q1EfnLQCvAYwfub9NnYMaCdoDGEyBDhgz5KigoKNfd3Z3sRDXoITrRpqINaGbDh+gOOm40derU70EHS0tLPQsLC6Pr6ureAECfoXw27k/BPVf0EZg00AbQAAyXc9COzd7e3mfw/zaEFmvLnAH6kAgAlHt5eZ0tKSnZV1BQMB/DbCLyS3BPOso+0wtgIEw/XD4EpcOINsFubExISPgc/8tQ1iPjnwF9FSDcBkBXduzYkVhRUZEC7dmGsjEoW6SLocXVQsD+bJaIMTExuRceHr7Sz88vH/lVnF5IDPhzAKG2qKjo0tGjR/8skUiykDcUZUnIf6YNf2NNNQV2ZBeBwuPxbsTHx6cBlC96CxS5dGfy5Mk7IyMjM6G1BFY8ZNsOWYxehsZsgupGA5RbycnJc4cNG1YEQZo4Lymh7RaAkgQfyIzAwZWm9Tts5uodjYEQZGjT+vfvXx0dHZ0BUI6/ZFDMoCEHAEawubn593FxcbMxtB90FC2d2SvAoCE3CPEhGdqQkJBlbm5uBcp8kV5K7aBAe0MJlJSUlAwPD4/9AQEBy5AvAW2BfM49CgwaAB7Gn0OI/s7Ozp/4+/vnIbtJn0CB73QK+eLg4OA9I0eO3IoyAWTWyN6oDAwaSIa6ekGI80lJSX9jwZ6+gSKNoRrgNqwTCAQXIPPr+P/7HgEGiJtDiPdJPX19fSmcrdJjUDpmFS73to+PTzbubQGtRR9MdQ4MtGU+BLFGAHgwMDDw3/oOijTBDn5jY2NTgPsHI4hN0ikwQJqWDjIIebj5m/D7J0MARbq+4+npmYN65AkvIjupM2CgLREYp4MRJZ+AwS3WJ1DIf+muIgxxkaWlZXFLS8tr6EugzoCBCibSFYLsw6XRkEBh6Wfcn8fsTqJOgEHj3Obm5hBaaQsNDd1vgKC0J/g1e6EtP6EvkaoOJ+NutGU8hOJbWFicFYlENYYICiVHR8e7bOoeiD65aQ0M3P4QuvL5fDJybYYICkutAOY0/UC4EKo1MBBuPF2hMWcMGJT2BF6n2GTipTUwGJNOdLW2tr5oyKAwYC7RFbOTi9bAgMkwMrwRERE1hgwKpZiYmFsU/KJPIq2BgZC0vkExUbMhg8JSE73DggE21woYikjBhAdm4lcAFKmzKkY7plprDNOatlcBFHX7ohQYWmkHwo00nF4FUGRMg1hrjYHgtH5q9iqAwiYTc2YztQNmwIABNWA2EAILDB0U8LdFmzw4rTVaAwMv8Q67jjZkUNobNjMbw7z5W1oDA2aXGTC+hgwKS7TEyeHxeFe0BgYe70k2NgMNHBTqw2S62trantQamNDQ0O/oBZZEIpnMVvIMEhS0xUMffMiLj4qKOq01MOjA44EDB/6HwnUAFG6IoDDHLop2atEqJMxDgy4cvDaoXh5bm5ltiKAw2Wl3F0ckEuXqZAWPUnh4+AEY3zpE2hHolKOhgYI2XTCMQjAb3Y2MjDyoM2DQoVogvQ+d7MflcpcYEihMW1ZQP4cPH77LwsLioc6AoeEUFBSUgwbqYdmT0cFRhgIK2vWEbXmbXvJPmTJlC0eNVUiVFoZdXV2vOTk5bUeHuTBkHxsIKEaQdTPkMXZxcdlib29/S536qr6Aapk+ffpGWPRyPIFANJqsz6CwlAlZffl8/g8zZsz4BP9bewIYWhq87e/v/yc8hWcAYRM67a6voKBtb8iUTa9M4IutxFCqVnuKVydqDwgI+BrDinZTmaLhQ7T3RA9BcYBMX0Emk7Fjx27w8fEp0Mj3UfP+HxMSEjYMHTqUZik7CHBez0AZDJmOQSaRnZ3dl/Hx8ZuRLe4NYCjdTU9Pf9fKyuo4BKD1DbGfn99qPQDlNYDyHWQaQTsc0tLS3kP2PY29ZQ19g7LU1NTFAOdbGDjT/Pz8jyDY2JdsU04BFGcCZd68eYvhc13TKozQtCJiqNKsrKxMNqzsSTBkz+F0HJborWQEUGhvbzFksMWUvDszM3ORqanpJa3jKy3qtkJzLmRkZKxwc3Nby/agkBN1HPSrXgCF3igWgj7AcJZ4enr+FUP8Pch0iaOD18nGOlDjazNnzvxo2rRpafBzriIrAPRf0FbQyB4AxJXTcSTnLMhfIBBcio2NTYWvQpuaruuqEa6Oxnh1dnZ27rhx48p3794dXVZWNgtBJ0Xj5AgeAP0TRFvUNN3lyQNFcDo2GUbSAyU3f/To0f+Ii4vbz7REp++/uDo0gLRd/TQAuvPkyZMjeXl5UZWVldHPnj37HfKJ6IxSESPaJEDa9VgJOyGI1mh9QJMZtZ+Ooyh5xIgR+6ChXyMopKXXHnl9rPMTbkx77iUlJV0FKLlHjhzxgQYFPnr0yBdB6Ju45U1Zvwh0n13JaNPhrcGcX85ISmfBJ5gBD0FDCsPCws5ixrmB7Gq01arJmciXAgwDh+KS/0HoqoiIiEugbwDS0JMnT46BFo2GRjmIxWJRU1PTYIBlgxllOBlMGHAxQHhKK/mwV1WY+W6MGjXq4sSJE6/DwNYy7Xis6oGwlwpMN0+MOvCICJ29EhwcfI5mek7HmUl6kWfKZJDK0cyI9vrR7tCnbLg9VaPNngVGjWPDKsdanF+O8+l9Mub0pT5g+oDpA6YPmD5g+oDpA6YPmFcqST3fEhDtAveGu31TzgOOxWUPaDrK9srkUwS8hJE0HQXtZWsxXSUpT0VpDbHvou4NJuscmXbGsz50l6xkIvpOPujXVoXAIFrlNzc3CxHE0W6AcbI3ILQf2NDQ0H6VAcUJ9x5FwFfj6ek5PyYmpn2BaO3atZGIov/OGlTaOSlPJyen1ampqZ0beXJzc51LS0v/gMCSDnd4K6hK+U4mJibX6dUr7tvKYidqf4r0pvXr10+vq6ub5e3t3SmbNJpnoc5zfBQ9yM5YiXYz0ilZVFyChtZ0BTsBiKDw0apVqzLwtxx1GpiA5Tk5Oa1VVVWkRTe705wHDx7Q10IKZILDUzwer6a4uHg7ZMmWBxcP8B1E4jVWVlZ5tbW1S9gDuMna7+QjEAiC6FpRUXERZSde6LQcH3rQ8iOl08ZAoPOEIDq9jA0TZcFlKph62dnZ0SdJSqSgsLLK9PT0daampqUAOl2D5YqGyMjIQ3w+vwj14+XLoSG/NTMzKxEKhf9i6zTxmtgPVfgYy9z8bMKECXTC3Rj0qTKm0BR/0i4MgS+VdK4KwNAuLDf2RNUFR4z2ScWHydWPxQOxoM4kJiaWEvj4P1sDXFTi89ysRE/L2tr6C/qgBTO6ipINEG7/glAXQ62Mrnjytpo8UdR/IF+f1J9s2ty5c/cTeAz84czwqj7bKOGD3+O7mq7FWVlZ77MhtU7RkCKNAnBd7hyQSCTt324BH40WwiBoi1x9Ie26NDc3/xYytT8QLy+vbaS56OjbarBWmY8iP6bSwcEhB52nl+Nr5Qtp5yMEt+sGGAdmt+o1tAGWsvUheBqpf319fTxb8Go7duxYKeQQgKJVdtrU4KPQwUtJSdmJKfUQmKQ0Nja6y5YB7WI68wPEQ7oAJoC0bsGCBRq950F9D1J3aX08oLeIH2aOKbJkb2+/kdmiWBWHaJd8ZM2HMlV/OGnSpL/k5+d7QcjnPhiRmZm5a+XKleRrvMscuhd8DfhErw8ZMmSNhh/uckJ9P9i63az+eLQ11tLS8mPZqZ1N75eXL18+C5rwDurs7YavQj60foyZtJMPc1CVhwQApgRT8hZSPbmie2z2GokGjsgZP/ItjsA/2AMAczSZMZiPVLFw4cI1zM5EkA1YvHjxB4pmQBjoQrbrW9gV4674IHXykdrVrmIlCSz3VlR4YYs5zV6rV6+Ox7C6y1zx9vEKAxZFaonGV6ryvSp4v1uldTkdr08+pZdocBznkE/E7E0yCS39/4I1FQppk5AF2Y9u7JZafIzYoS/6lhy9SbygoI4HyJaVye83kX5ItHMIsnu6A8WW8X3hYbC65TJ5/ozvZSW8rFn4QHWknXZkstEOjAZN+Bj17Mk+w03/F2AAHZMD17Q4OMAAAAAASUVORK5CYII=",
    "no-data-dark.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABPCAYAAABWIbNMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUI0RTA2RDZFNTYzMTFFMkJDOTdGRTQ2M0VGMEIxOEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUI0RTA2RDdFNTYzMTFFMkJDOTdGRTQ2M0VGMEIxOEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QjRFMDZENEU1NjMxMUUyQkM5N0ZFNDYzRUYwQjE4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QjRFMDZENUU1NjMxMUUyQkM5N0ZFNDYzRUYwQjE4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjyBbi0AAAvnSURBVHja7JwLUFTnFcdZ2EVYEQNxMkgEI9MoaoVQpdakom0hE6t2nFocFRrHlqSatlOLio+pjDOZjCYkdmKiE9vRacahoyMdH4wYsE2iIdIWEIurRV4LldfyXJ7Lm/7Pci69ud1d7t59Ycs3c+Yu997vfOf+7vnO97yoxsbGvCwllUrlJSdZy28hqSHfgKyGREEWQhZAAiAz+Z4elmpIBaQUchtSAhlxxE57bVa5GIwG8n3INsg6SKD44tDQUBekd3BwsI/K02g0WshMSKBETyfkOiQTkiuG9KSBIS9IgaRCwhhCZ319/b1Hjx7pbt++/ejGjRsNJSUlHbg0TJepSPYqdUxMTND69etDV69eHYm0bO7cudEiWDWQE5CzkD5XgTHfZEnsKUQkasgbkBbI2Ojo6FB1dfVnp0+f/k1wcHACbo+GhLPnqG2UTYBm870vzJ49O+HkyZOH9Xr959A5PDaeGiA7ISolYCYTZ4L5OqSILB4ZGRkqLS29smXLlmSOJ3ME71Qi7E1PE9ikpKQdOp3uGpXBgO5AlkxVMLsh/WRlXV3d33fu3LkDlyIh/kph2LDLH7KYymhsbCxiOH2Qn0wZMLjPB/IBWTY8PNyfnZ39Prc8WmcDsWAfBerY3NzcU/CeAQb0rpyq5VIwuMcXcoms6e3tbdyzZw8F23muBmLBzvC0tLRdfX19zQwnk2zzCBjyFATBLLLCaDRWbty4cRO1RO6GIrJz1q5du5Ko6ecYl2nLc1wJ5jRD0a9cufJlnJrhCSiCnThqAeXPZJMAB+mYW8FwoB3r6empT0xM/IGtZtdNooX35pFNCMbFW7du3Y5q1cJwktwCBueXwYgBCrT79+9/1ZOeYgnK0qVLv02t1pEjR1JQnQZxrRuXnncpGJzzhpveJSNycnJ+y73bqQbFh80NzMvL+5Bby3xpvHEqGBTwGhtRRK2PPYW4GYo5+fn5zTcYDPe4Su1wCRj8PQuu2UrueejQoR/ZW4i7oQjp6NGjW2kIAbsNuN3f6WBQhQ6TIQ8ePLgsmiLwBBjZUITBbFlZ2XW6HyP4N5wKBr81qEYGIr9v377vKglkHoJiTunp6euQbxRg9BQnnQYGUDaRMVVVVZ9S1fUQGItQZA5dtLW1tfncx/me08Cgu3+FlGIc9HOlfQJXQZE7prt+/Xoq973OOwUMza8gcPUMDAx0xsTEhHoAjE0ocsHExcWFwVt64P0dVJ0cBoN6uZKMqqmpuclzIu4EMykUO6ZHvOvq6r7kIBwtp3xvW9rgevF0bG5uLiAGXu5LNG1xRaVSJTQ1Nd2Nj4//FVrEAhofKtQ3imf4K/3AcCFBFslJBovL6Yg39rcnGIo5QVcBNyYxDoPx9fWNoGNlZWXpkwyFX+5987KFRrPQoWk+jjFtFHh5ctrLxTFGVkxROgVLA14a/JpMpnqHgy8UmdBc1zs6G+YqKHaC8QKUZlrLcggMjUjJ0K6urkoXg1EMxV4waExqaUnHKWC6u7srXAjGISj2goH31/Cyi+NVCc2bq6qSw1CUVCXEzS6HwSDwtkFRhwvAOAWKvWDgLRQzGxwG09bWpuOJngAngnEaFDsXBkOozJaWlmKHe76oRv/i4+Kp3k+ZLOElLxHijMMdvPb29gd07O/vf/FJhsK7N16io9FofOgwGPR4vzBvPVCrv/MkQ+FnWENHnU73hcM9X9T/YFrA4uG6RmGMcWpMUbjG7odnME+fBAcHBzpjokpVXV2dx8sQGxSAcSkUuWBgeyLZUF5enu20GbyrV6/u4oX7q3aCcTkUuWBgey7ZcfHixR1OA4MHCkGrZOCdTAtkgnELFJm7MhZSLMNwoC40NHSOM5dPVPn5+eZFfLROH8kA4zYocsAgrnxMtty8efMdYRbSaetK69atW4ICOngAFmkDjFuhyNiV8QLsGaFF/tjY2AhXLNH65ObmnuAliE+tgHE7lEl2Zahgq3me9/Lly2+KuyZOXbsOCQl5Dr3HRzxE+KmkEI9AmQSMecmkubn5vlarDXXlNhDVwYMHt6HpGwAE2gwYJWza8RQUG9tVVtDiIy2Z7N69e5M7Ng4FZGdnv8t7eOto74knoVjZrjIfo+h6bp7f5F2ebtlq9uy9e/eyGE6XJ6FY2JXxDGyqJJuKi4svUARw6x48X1/fyKqqqr9wMO5LS0v7oSegSDYfPAco5dzD/WTGjBmLPLKdNTw8fDkt9LPnPMYh2lNgOKY0ClCCgoKiPLkB2luj0USLqhUF5J/xXLG7wFBZe2nllWwoLCz8I7x5mbXlZLdumUdadOnSpbfRWgnbSD+DLHUDlBjILWELa2Zm5luw5fkp9S0BUmhKSsqrra2tDxkO9ZB/B/maC4AsgpzlMsYMBkNpcnJykrVA6/GvT3hv/7eysrIyTCZTGwMagfwJQpuPHNn66gfZDLnKOseom3/hwoVjKPOblprkqfRZzoT3hIWFvZyTk/MBRrQNY/9JNNlFm5B+DXkREmTDMLr2EsePa5BOQQmNkuljDoyUaSfGXCWzeR4Bw3lpXBIWEBCw5r333jtQVlb2Ca/nSBNtUK6GlELu8+8e6U3Ia6RNhhkZGfv9/PzW8HZab3uXT+wB49JvIlXjSoLozc6cOXNuamrqkri4uMXwqPloUkMB7hm0IgE+Pj5aUkXrPoDQi2qCYVlbXW1tbRU8r/TUqVMVtEGSNi1AyPPG7LVTrs0Teh0FY89Evdf4J39P8a5yLccGtWg3xTBLP028QboJBB+dlhwC8/+evKcRTIOZBjMNZhrMNJhpMNNgpsH8b4Kh7xzbIRE0FBALUqLX+HcEiZLzNAY6ztcEoY8xXpdRbqIkn1iOT5K3iu8Tl7Pchj6xBFnSY+GZx8H09/fT53w01M+SWtHQ0PCU+MhjjQiaiEe+1efOnfsllL1Cotfry3D5zGQPJ+i6devWW0JeEtKFQeQGflGWEk01RGCQWYH7kkXjugqxnocPH56j82LbWHps6fmvAZXJZPonRq/dPMo/IL5eX19v/nqWjsK50dHRu52dnWT8ChoYiqYbFhQWFr7Pel63NqQX65RMVwSeOHFiM2yhKYrj0nyw8+OBgYEGnU53nMuIsKTfYDC8TRcxOo+zdN2SHimTiRhjNBqLiSBOHqKJIhsjU3K9mJKSEnor9G9KukTX9LGxsRnQVYKH+4WCUW9XampqTktLyy3k3y697uvru6m9vb2opqbmGv2Nt71dSfyQo2cCjEajGTxz5swheIM35PfWlPb29sbRV29r1669aOXh6jo6Or5Uq9U0Wx+hAI4J+iuQP0ySP9Hb2zuQHmbDhg0lBN/Hx+c1BVxk6flKq0Rvq7Ky8gIy0vxqohXD55Ab4mebtZIBlmKNV2tra4iSN4oyWqX5UeaP8WYbV61adZngEXw8UDgHXtnJmh7h2yxrzbUpMjLyGFUpPFyGpSpFHoU0aqtwf3//QTpCj1oJGHjLiCR/EDx6TVNTEy3NmF/I+fPnz5LnogFItkO1bD2W+jH6O3fufIiHnw8I70gvUmCE8mdtla7VaufTEQHaqAQM9M8W50eZu8n9w8PDtwtNb3p6OlWBAEDcLFevPXosdvASEhIy0aTmQElKYGBglKSpvQNFs0A83poBfn5+a8nroqKiKpSAgcdFk7sL+VHWNtInaXpfKSoqOsmxKFFmFbWp5yvhQ2iu8XbyxEr27t27imIJ3KxT0lyHIACXDw0NfS7kl0g83c9NoV3NNUsElVleXv4R/72cP4g/ZWE1Yh51M1ANrslori3q4TShZ2JO2BoY8mhUqXRhCUPcj6G+Bt4o7Y+5yQUKBR2ge6urq6nFmqcATCL3kYqpT0Tn8IbTyWjhb6k0NjZm88sLsgXGmh4hSfXYAmP2jubm5ttSMF7js/txqFZ/EK//QE8+dfBwbaGtNRsBjDQBivHx48f0Nf0K4V48TC0ZbU1XQUFBCq9fH7YFxpoeIUn1mFcJUM9WUSMA+YcFOPTfDkP4WpPkmvCPRIXUxvfUTVLdQ1ivNA1x3nLRuTjW+8CKrqe5B0559HxuAdtGnxR32auHOqrTyydW0r8FGADOGvuNcLn3BwAAAABJRU5ErkJggg=="
};


// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.0.0",
        round = Math.round, i,
        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing tokens
        parseMultipleFormatChunker = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenWord = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, // any word (or two) characters or numbers including two word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO seperator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000
        isoRegex = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.S', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Month|Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return ~~(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(~~(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(a / 60), 2) + ":" + leftZeroFill(~~a % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(10 * a / 6), 4);
            },
            X    : function () {
                return this.unix();
            }
        };

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a));
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i]);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var data = this._data = {},
            years = duration.years || duration.year || duration.y || 0,
            months = duration.months || duration.month || duration.M || 0,
            weeks = duration.weeks || duration.week || duration.w || 0,
            days = duration.days || duration.day || duration.d || 0,
            hours = duration.hours || duration.hour || duration.h || 0,
            minutes = duration.minutes || duration.minute || duration.m || 0,
            seconds = duration.seconds || duration.second || duration.s || 0,
            milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;

        // representation for dateAddRemove
        this._milliseconds = milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = months +
            years * 12;

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;
        seconds += absRound(milliseconds / 1000);

        data.seconds = seconds % 60;
        minutes += absRound(seconds / 60);

        data.minutes = minutes % 60;
        hours += absRound(minutes / 60);

        data.hours = hours % 24;
        days += absRound(hours / 24);

        days += weeks * 7;
        data.days = days % 30;

        months += absRound(days / 30);

        data.months = months % 12;
        years += absRound(months / 12);

        data.years = years;
    }


    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding) {
        var ms = duration._milliseconds,
            d = duration._days,
            M = duration._months,
            currentDate;

        if (ms) {
            mom._d.setTime(+mom + ms * isAdding);
        }
        if (d) {
            mom.date(mom.date() + d * isAdding);
        }
        if (M) {
            currentDate = mom.date();
            mom.date(1)
                .month(mom.month() + M * isAdding)
                .date(Math.min(currentDate, mom.daysInMonth()));
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (~~array1[i] !== ~~array2[i]) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }


    /************************************
        Languages
    ************************************/


    Language.prototype = {
        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex, output;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy);
        },
        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    };

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        if (!key) {
            return moment.fn._lang;
        }
        if (!languages[key] && hasModule) {
            require('./lang/' + key);
        }
        return languages[key];
    }


    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[.*\]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += typeof array[i].call === 'function' ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return m.lang().longDateFormat(input) || input;
        }

        while (i-- && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        }

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token) {
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
            return parseTokenFourDigits;
        case 'YYYYY':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'a':
        case 'A':
            return parseTokenWord;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
            return parseTokenOneOrTwoDigits;
        default :
            return new RegExp(token.replace('\\', ''));
        }
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, b,
            datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            datePartArray[1] = (input == null) ? 0 : ~~input - 1;
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[1] = a;
            } else {
                config._isValid = false;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DDDD
        case 'DD' : // fall through to DDDD
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                datePartArray[2] = ~~input;
            }
            break;
        // YEAR
        case 'YY' :
            datePartArray[0] = ~~input + (~~input > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[0] = ~~input;
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = ((input + '').toLowerCase() === 'pm');
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[3] = ~~input;
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[4] = ~~input;
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[5] = ~~input;
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
            datePartArray[6] = ~~ (('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            a = (input + '').match(parseTimezoneChunker);
            if (a && a[1]) {
                config._tzh = ~~a[1];
            }
            if (a && a[2]) {
                config._tzm = ~~a[2];
            }
            // reverse offsets
            if (a && a[0] === '+') {
                config._tzh = -config._tzh;
                config._tzm = -config._tzm;
            }
            break;
        }

        // if the input is null, the date is not valid
        if (input == null) {
            config._isValid = false;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(config) {
        var i, date, input = [];

        if (config._d) {
            return;
        }

        for (i = 0; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[3] += config._tzh || 0;
        input[4] += config._tzm || 0;

        date = new Date(0);

        if (config._useUTC) {
            date.setUTCFullYear(input[0], input[1], input[2]);
            date.setUTCHours(input[3], input[4], input[5], input[6]);
        } else {
            date.setFullYear(input[0], input[1], input[2]);
            date.setHours(input[3], input[4], input[5], input[6]);
        }

        config._d = date;
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var tokens = config._f.match(formattingTokens),
            string = config._i,
            i, parsedInput;

        config._a = [];

        for (i = 0; i < tokens.length; i++) {
            parsedInput = (getParseRegexForToken(tokens[i]).exec(string) || [])[0];
            if (parsedInput) {
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            }
            // don't parse if its not a known token
            if (formatTokenFunctions[tokens[i]]) {
                addTimeToArrayFromToken(tokens[i], parsedInput, config);
            }
        }
        // handle am pm
        if (config._isPm && config._a[3] < 12) {
            config._a[3] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[3] === 12) {
            config._a[3] = 0;
        }
        // return
        dateFromArray(config);
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            tempMoment,
            bestMoment,

            scoreToBeat = 99,
            i,
            currentDate,
            currentScore;

        while (config._f.length) {
            tempConfig = extend({}, config);
            tempConfig._f = config._f.pop();
            makeDateFromStringAndFormat(tempConfig);
            tempMoment = new Moment(tempConfig);

            if (tempMoment.isValid()) {
                bestMoment = tempMoment;
                break;
            }

            currentScore = compareArrays(tempConfig._a, tempMoment.toArray());

            if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempMoment;
            }
        }

        extend(config, bestMoment);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i;
        if (isoRegex.exec(string)) {
            config._f = 'YYYY-MM-DDT';
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += " Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromArray(config);
        } else {
            config._d = input instanceof Date ? new Date(+input) : new Date(input);
        }
    }


    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        return Math.ceil(moment(mom).add('d', daysToDayOfWeek).dayOfYear() / 7);
    }


    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || input === '') {
            return null;
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);
            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang) {
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang) {
        return makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format
        });
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var isDuration = moment.isDuration(input),
            isNumber = (typeof input === 'number'),
            duration = (isDuration ? input._data : (isNumber ? {} : input)),
            ret;

        if (isNumber) {
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        }

        ret = new Duration(duration);

        if (isDuration && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var i;

        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(key, values);
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };


    /************************************
        Moment Prototype
    ************************************/


    moment.fn = Moment.prototype = {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d;
        },

        unix : function () {
            return Math.floor(+this._d / 1000);
        },

        toString : function () {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._d;
        },

        toJSON : function () {
            return moment.utc(this).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            if (this._isValid == null) {
                if (this._a) {
                    this._isValid = !compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray());
                } else {
                    this._isValid = !isNaN(this._d.getTime());
                }
            }
            return !!this._isValid;
        },

        utc : function () {
            this._isUTC = true;
            return this;
        },

        local : function () {
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).utc() : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            if (units) {
                // standardize on singular form
                units = units.replace(/s$/, '');
            }

            if (units === 'year' || units === 'month') {
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                output += ((this - moment(this).startOf('month')) - (that - moment(that).startOf('month'))) / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that) - zoneDiff;
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? diff / 864e5 : // 1000 * 60 * 60 * 24
                    units === 'week' ? diff / 6048e5 : // 1000 * 60 * 60 * 24 * 7
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            var year = this.year();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },

        isDST : function () {
            return (this.zone() < moment([this.year()]).zone() ||
                this.zone() < moment([this.year(), 5]).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return input == null ? day :
                this.add({ d : input - day });
        },

        startOf: function (units) {
            units = units.replace(/s$/, '');
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.day(0);
            }

            return this;
        },

        endOf: function (units) {
            return this.startOf(units).add(units.replace(/s?$/, 's'), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        zone : function () {
            return this._isUTC ? 0 : this._d.getTimezoneOffset();
        },

        daysInMonth : function () {
            return moment.utc([this.year(), this.month() + 1, 0]).date();
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    };

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    /************************************
        Duration Prototype
    ************************************/


    moment.duration.fn = Duration.prototype = {
        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              this._months * 2592e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        lang : moment.fn.lang
    };

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });


    /************************************
        Exposing Moment
    ************************************/


    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['moment'] = moment;
    }
    /*global define:false */
    if (typeof define === "function" && define.amd) {
        define("moment", [], function () {
            return moment;
        });
    }
}).call(this);

// Generated by CoffeeScript 1.6.3
var Timechart_DataLimitRenderer;

Timechart_DataLimitRenderer = (function() {
  "use strict";
  function Timechart_DataLimitRenderer(r) {
    this.r = r;
    this.scene = r.scene;
  }

  Timechart_DataLimitRenderer.prototype.paint = function(g, dataExistsFrom, dataExistsTo) {
    var dataLimitFrom, dataLimitTo, df, dt, from, height, to, width, x, x0, x1, y0, _ref;
    return;
    df = null;
    dt = null;
    if (this.bars != null) {
      df = this.bars.dataExistsFrom;
      dt = this.bars.dataExistsTo;
    }
    from = this.scene.timeStart;
    to = this.scene.timeEnd;
    _ref = this.scene.getDataPeriod(false), dataLimitFrom = _ref[0], dataLimitTo = _ref[1];
    x0 = this.scene.x0;
    y0 = this.scene.y0;
    height = this.scene.height;
    x1 = x0 + this.scene.width;
    if (this.scene.settings.area.noData) {
      if (dataLimitFrom !== null && dataLimitFrom > from) {
        x = this.scene.timeToX(dataLimitFrom);
        this.paintFancyRect(g, x0, x1, -Infinity, x, y0, height, this.scene.settings.area.style.noData);
        x0 = x;
        from = dataLimitFrom;
      }
      if (dataLimitTo !== null && dataLimitTo < to && x0 < x1) {
        x = this.scene.timeToX(dataLimitTo);
        this.paintFancyRect(g, x0, x1, x, Infinity, y0, height, this.scene.settings.area.style.noData);
        x1 = x;
        to = dataLimitTo;
      }
    }
    width = x1 - x0;
    if (width <= 0) {
      return;
    }
    if (dataExistsFrom === null || dataExistsTo === null) {
      this.paintFancyRect(g, x0, x1, x0, x1, y0, height, this.scene.settings.area.style.loadingData);
    } else {
      this.paintFancyRect(g, x0, x1, x0, this.scene.timeToX(dataExistsFrom), y0, height, this.scene.settings.area.style.loadingData);
      this.paintFancyRect(g, x0, x1, this.scene.timeToX(dataExistsTo), x1, y0, height, this.scene.settings.area.style.loadingData);
    }
  };

  Timechart_DataLimitRenderer.prototype.paintFancyRect = function(g, clipX0, clipX1, x0, x1, y0, height, style) {
    var ih, image, iw, iww, ix, w, x, xx0, xx1, y;
    if (x0 >= clipX1 || x1 <= clipX0) {
      return;
    }
    xx0 = Math.max(x0, clipX0);
    xx1 = Math.min(x1, clipX1);
    g.beginPath();
    g.rect(xx0, y0, xx1 - xx0, height);
    Base_Graphics.paint(g, style);
    if (style.image != null) {
      image = this.r.getImage(style.image);
      if (image != null) {
        iw = image.width;
        ih = image.height;
        x = (xx0 + xx1) / 2;
        y = y0 + (height - ih) / 2;
        w = iw / 2 + 2;
        if (x + w - 2 > x1) {
          x = x1 - iw - 2;
          ix = xx0 - x;
          if (((iw - ix) | 0) > 0 && (ix | 0) < (iw | 0)) {
            return g.drawImage(image, ix | 0, 0, (iw - ix) | 0, ih, (x + ix) | 0, y | 0, (iw - ix) | 0, ih | 0);
          }
        } else if (x - w < x0) {
          x = x0 + 2;
          iww = Math.min(xx1 - x, iw);
          if ((iww | 0) > 0) {
            return g.drawImage(image, 0, 0, iww | 0, ih, x | 0, y | 0, iww | 0, ih | 0);
          }
        } else {
          return g.drawImage(image, (x - iw / 2) | 0, y | 0);
        }
      }
    }
  };

  return Timechart_DataLimitRenderer;

})();

/*
//@ sourceMappingURL=DataLimitRenderer.map
*/

// Generated by CoffeeScript 1.6.3
var Base_CssColorParser;

Base_CssColorParser = (function() {
  function Base_CssColorParser() {}

  Base_CssColorParser.clamp_css_byte = function(i) {
    i = Math.round(i);
    if (i < 0) {
      return 0;
    } else {
      if (i > 255) {
        return 255;
      } else {
        return i;
      }
    }
  };

  Base_CssColorParser.clamp_css_float = function(f) {
    if (f < 0) {
      return 0;
    } else {
      if (f > 1) {
        return 1;
      } else {
        return f;
      }
    }
  };

  Base_CssColorParser.parse_css_int = function(str) {
    if (str[str.length - 1] === "%") {
      return Base_CssColorParser.clamp_css_byte(parseFloat(str) / 100 * 255);
    }
    return Base_CssColorParser.clamp_css_byte(parseInt(str));
  };

  Base_CssColorParser.parse_css_float = function(str) {
    if (str[str.length - 1] === "%") {
      return Base_CssColorParser.clamp_css_float(parseFloat(str) / 100);
    }
    return Base_CssColorParser.clamp_css_float(parseFloat(str));
  };

  Base_CssColorParser.css_hue_to_rgb = function(m1, m2, h) {
    if (h < 0) {
      h += 1;
    } else {
      if (h > 1) {
        h -= 1;
      }
    }
    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
      return m2;
    }
    if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  };

  Base_CssColorParser.parseCSSColor = function(css_str) {
    var alpha, ep, fname, h, iv, l, m1, m2, op, params, s, str;
    str = css_str.replace(RegExp(" ", "g"), "").toLowerCase();
    if (str in Base_CssColorParser.kCSSColorTable) {
      return Base_CssColorParser.kCSSColorTable[str].slice();
    }
    if (str[0] === "#") {
      if (str.length === 4) {
        iv = parseInt(str.substr(1), 16);
        if (!(iv >= 0 && iv <= 0xfff)) {
          return null;
        }
        return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8), (iv & 0xf0) | ((iv & 0xf0) >> 4), (iv & 0xf) | ((iv & 0xf) << 4), 1];
      } else if (str.length === 7) {
        iv = parseInt(str.substr(1), 16);
        if (!(iv >= 0 && iv < 0xffffff)) {
          return null;
        }
        return [(iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1];
      }
      return null;
    }
    op = str.indexOf("(");
    ep = str.indexOf(")");
    if (op !== -1 && ep + 1 === str.length) {
      fname = str.substr(0, op);
      params = str.substr(op + 1, ep - (op + 1)).split(",");
      alpha = 1;
      if (fname === "rgba") {
        if (params.length !== 4) {
          return null;
        }
        alpha = Base_CssColorParser.parse_css_float(params.pop());
      }
      if (fname === "rgba" || fname === "rgb") {
        if (params.length !== 3) {
          return null;
        }
        return [Base_CssColorParser.parse_css_int(params[0]), Base_CssColorParser.parse_css_int(params[1]), Base_CssColorParser.parse_css_int(params[2]), alpha];
      }
      if (fname === "hsla") {
        if (params.length !== 4) {
          return null;
        }
        alpha = Base_CssColorParser.parse_css_float(params.pop());
      }
      if (fname === "hsla" || fname === "hsl") {
        if (params.length !== 3) {
          return null;
        }
        h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;
        s = parse_css_float(params[1]);
        l = parse_css_float(params[2]);
        m2 = (l <= 0.5 ? l * (s + 1) : l + s - l * s);
        m1 = l * 2 - m2;
        return [Base_CssColorParser.clamp_css_byte(Base_CssColorParser.css_hue_to_rgb(m1, m2, h + 1 / 3) * 255), Base_CssColorParser.clamp_css_byte(Base_CssColorParser.css_hue_to_rgb(m1, m2, h) * 255), Base_CssColorParser.clamp_css_byte(Base_CssColorParser.css_hue_to_rgb(m1, m2, h - 1 / 3) * 255), alpha];
      }
    }
    return null;
  };

  Base_CssColorParser.kCSSColorTable = {
    transparent: [0, 0, 0, 0],
    aliceblue: [240, 248, 255, 1],
    antiquewhite: [250, 235, 215, 1],
    aqua: [0, 255, 255, 1],
    aquamarine: [127, 255, 212, 1],
    azure: [240, 255, 255, 1],
    beige: [245, 245, 220, 1],
    bisque: [255, 228, 196, 1],
    black: [0, 0, 0, 1],
    blanchedalmond: [255, 235, 205, 1],
    blue: [0, 0, 255, 1],
    blueviolet: [138, 43, 226, 1],
    brown: [165, 42, 42, 1],
    burlywood: [222, 184, 135, 1],
    cadetblue: [95, 158, 160, 1],
    chartreuse: [127, 255, 0, 1],
    chocolate: [210, 105, 30, 1],
    coral: [255, 127, 80, 1],
    cornflowerblue: [100, 149, 237, 1],
    cornsilk: [255, 248, 220, 1],
    crimson: [220, 20, 60, 1],
    cyan: [0, 255, 255, 1],
    darkblue: [0, 0, 139, 1],
    darkcyan: [0, 139, 139, 1],
    darkgoldenrod: [184, 134, 11, 1],
    darkgray: [169, 169, 169, 1],
    darkgreen: [0, 100, 0, 1],
    darkgrey: [169, 169, 169, 1],
    darkkhaki: [189, 183, 107, 1],
    darkmagenta: [139, 0, 139, 1],
    darkolivegreen: [85, 107, 47, 1],
    darkorange: [255, 140, 0, 1],
    darkorchid: [153, 50, 204, 1],
    darkred: [139, 0, 0, 1],
    darksalmon: [233, 150, 122, 1],
    darkseagreen: [143, 188, 143, 1],
    darkslateblue: [72, 61, 139, 1],
    darkslategray: [47, 79, 79, 1],
    darkslategrey: [47, 79, 79, 1],
    darkturquoise: [0, 206, 209, 1],
    darkviolet: [148, 0, 211, 1],
    deeppink: [255, 20, 147, 1],
    deepskyblue: [0, 191, 255, 1],
    dimgray: [105, 105, 105, 1],
    dimgrey: [105, 105, 105, 1],
    dodgerblue: [30, 144, 255, 1],
    firebrick: [178, 34, 34, 1],
    floralwhite: [255, 250, 240, 1],
    forestgreen: [34, 139, 34, 1],
    fuchsia: [255, 0, 255, 1],
    gainsboro: [220, 220, 220, 1],
    ghostwhite: [248, 248, 255, 1],
    gold: [255, 215, 0, 1],
    goldenrod: [218, 165, 32, 1],
    gray: [128, 128, 128, 1],
    green: [0, 128, 0, 1],
    greenyellow: [173, 255, 47, 1],
    grey: [128, 128, 128, 1],
    honeydew: [240, 255, 240, 1],
    hotpink: [255, 105, 180, 1],
    indianred: [205, 92, 92, 1],
    indigo: [75, 0, 130, 1],
    ivory: [255, 255, 240, 1],
    khaki: [240, 230, 140, 1],
    lavender: [230, 230, 250, 1],
    lavenderblush: [255, 240, 245, 1],
    lawngreen: [124, 252, 0, 1],
    lemonchiffon: [255, 250, 205, 1],
    lightblue: [173, 216, 230, 1],
    lightcoral: [240, 128, 128, 1],
    lightcyan: [224, 255, 255, 1],
    lightgoldenrodyellow: [250, 250, 210, 1],
    lightgray: [211, 211, 211, 1],
    lightgreen: [144, 238, 144, 1],
    lightgrey: [211, 211, 211, 1],
    lightpink: [255, 182, 193, 1],
    lightsalmon: [255, 160, 122, 1],
    lightseagreen: [32, 178, 170, 1],
    lightskyblue: [135, 206, 250, 1],
    lightslategray: [119, 136, 153, 1],
    lightslategrey: [119, 136, 153, 1],
    lightsteelblue: [176, 196, 222, 1],
    lightyellow: [255, 255, 224, 1],
    lime: [0, 255, 0, 1],
    limegreen: [50, 205, 50, 1],
    linen: [250, 240, 230, 1],
    magenta: [255, 0, 255, 1],
    maroon: [128, 0, 0, 1],
    mediumaquamarine: [102, 205, 170, 1],
    mediumblue: [0, 0, 205, 1],
    mediumorchid: [186, 85, 211, 1],
    mediumpurple: [147, 112, 219, 1],
    mediumseagreen: [60, 179, 113, 1],
    mediumslateblue: [123, 104, 238, 1],
    mediumspringgreen: [0, 250, 154, 1],
    mediumturquoise: [72, 209, 204, 1],
    mediumvioletred: [199, 21, 133, 1],
    midnightblue: [25, 25, 112, 1],
    mintcream: [245, 255, 250, 1],
    mistyrose: [255, 228, 225, 1],
    moccasin: [255, 228, 181, 1],
    navajowhite: [255, 222, 173, 1],
    navy: [0, 0, 128, 1],
    oldlace: [253, 245, 230, 1],
    olive: [128, 128, 0, 1],
    olivedrab: [107, 142, 35, 1],
    orange: [255, 165, 0, 1],
    orangered: [255, 69, 0, 1],
    orchid: [218, 112, 214, 1],
    palegoldenrod: [238, 232, 170, 1],
    palegreen: [152, 251, 152, 1],
    paleturquoise: [175, 238, 238, 1],
    palevioletred: [219, 112, 147, 1],
    papayawhip: [255, 239, 213, 1],
    peachpuff: [255, 218, 185, 1],
    peru: [205, 133, 63, 1],
    pink: [255, 192, 203, 1],
    plum: [221, 160, 221, 1],
    powderblue: [176, 224, 230, 1],
    purple: [128, 0, 128, 1],
    red: [255, 0, 0, 1],
    rosybrown: [188, 143, 143, 1],
    royalblue: [65, 105, 225, 1],
    saddlebrown: [139, 69, 19, 1],
    salmon: [250, 128, 114, 1],
    sandybrown: [244, 164, 96, 1],
    seagreen: [46, 139, 87, 1],
    seashell: [255, 245, 238, 1],
    sienna: [160, 82, 45, 1],
    silver: [192, 192, 192, 1],
    skyblue: [135, 206, 235, 1],
    slateblue: [106, 90, 205, 1],
    slategray: [112, 128, 144, 1],
    slategrey: [112, 128, 144, 1],
    snow: [255, 250, 250, 1],
    springgreen: [0, 255, 127, 1],
    steelblue: [70, 130, 180, 1],
    tan: [210, 180, 140, 1],
    teal: [0, 128, 128, 1],
    thistle: [216, 191, 216, 1],
    tomato: [255, 99, 71, 1],
    turquoise: [64, 224, 208, 1],
    violet: [238, 130, 238, 1],
    wheat: [245, 222, 179, 1],
    white: [255, 255, 255, 1],
    whitesmoke: [245, 245, 245, 1],
    yellow: [255, 255, 0, 1],
    yellowgreen: [154, 205, 50, 1]
  };

  return Base_CssColorParser;

})();

/*
//@ sourceMappingURL=CssColorParser.map
*/

// Generated by CoffeeScript 1.6.3
var Base_MonotoneCurve;

Base_MonotoneCurve = (function() {
  function Base_MonotoneCurve(x, y) {
    var alpha, beta, delta, dist, i, m, n, tau, to_fix, _i, _j, _k, _l, _len, _len1, _m, _n, _ref, _ref1, _ref2, _ref3;
    n = x.length;
    delta = [];
    m = [];
    alpha = [];
    beta = [];
    dist = [];
    tau = [];
    for (i = _i = 0, _ref = n - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      delta[i] = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
      if (i > 0) {
        m[i] = (delta[i - 1] + delta[i]) / 2;
      }
    }
    m[0] = delta[0];
    m[n - 1] = delta[n - 2];
    to_fix = [];
    for (i = _j = 0, _ref1 = n - 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      if (delta[i] === 0) {
        to_fix.push(i);
      }
    }
    for (_k = 0, _len = to_fix.length; _k < _len; _k++) {
      i = to_fix[_k];
      m[i] = m[i + 1] = 0;
    }
    for (i = _l = 0, _ref2 = n - 1; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; i = 0 <= _ref2 ? ++_l : --_l) {
      alpha[i] = m[i] / delta[i];
      beta[i] = m[i + 1] / delta[i];
      dist[i] = Math.pow(alpha[i], 2) + Math.pow(beta[i], 2);
      tau[i] = 3 / Math.sqrt(dist[i]);
    }
    to_fix = [];
    for (i = _m = 0, _ref3 = n - 1; 0 <= _ref3 ? _m < _ref3 : _m > _ref3; i = 0 <= _ref3 ? ++_m : --_m) {
      if (dist[i] > 9) {
        to_fix.push(i);
      }
    }
    for (_n = 0, _len1 = to_fix.length; _n < _len1; _n++) {
      i = to_fix[_n];
      m[i] = tau[i] * alpha[i] * delta[i];
      m[i + 1] = tau[i] * beta[i] * delta[i];
    }
    this.x = x;
    this.y = y;
    this.m = m;
  }

  Base_MonotoneCurve.prototype.interpolate = function(x) {
    var h, h00, h01, h10, h11, i, t, t2, t3, y, _i, _ref;
    for (i = _i = _ref = this.x.length - 2; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
      if (this.x[i] <= x) {
        break;
      }
    }
    h = this.x[i + 1] - this.x[i];
    t = (x - this.x[i]) / h;
    t2 = Math.pow(t, 2);
    t3 = Math.pow(t, 3);
    h00 = 2 * t3 - 3 * t2 + 1;
    h10 = t3 - 2 * t2 + t;
    h01 = -2 * t3 + 3 * t2;
    h11 = t3 - t2;
    y = h00 * this.y[i] + h10 * h * this.m[i] + h01 * this.y[i + 1] + h11 * h * this.m[i + 1];
    return y;
  };

  return Base_MonotoneCurve;

})();

/*
//@ sourceMappingURL=MonotoneCurve.map
*/

// Generated by CoffeeScript 1.6.3
var Base_TimeStep;

Base_TimeStep = (function() {
  "use strict";
  Base_TimeStep.parsingMap = {
    milliseconds: 'ms',
    millisecond: 'ms',
    second: 's',
    seconds: 's',
    minute: 'm',
    minutes: 'm',
    hour: 'h',
    hours: 'h',
    day: 'd',
    days: 'd',
    week: 'w',
    weeks: 'w',
    month: 'M',
    months: 'M',
    year: 'y',
    years: 'y',
    'ms': 'ms',
    's': 's',
    'm': 'm',
    'h': 'h',
    'd': 'd',
    'w': 'w',
    'M': 'M',
    'y': 'y'
  };

  Base_TimeStep.knownUnits = ['ms', 's', 'm', 'h', 'd', 'w', 'M', 'y'];

  Base_TimeStep.isGoodUnit = function(unit) {
    return Base_TimeStep.parsingMap[unit] != null;
  };

  Base_TimeStep.prototype.unit = "s";

  Base_TimeStep.prototype.count = 1;

  Base_TimeStep.prototype.name = null;

  function Base_TimeStep(unit, count) {
    this.unit = unit;
    this.count = count;
    this.name = "" + this.count + " " + this.unit;
  }

  Base_TimeStep.parse = function(input) {
    var count, l, name, s, unit, unitText;
    if (input == null) {
      return null;
    }
    if (input.unit != null) {
      name = input.name;
      unitText = input.unit;
    } else {
      unitText = input;
      name = input;
    }
    if (input.count != null) {
      count = input.count;
      unit = input.unit;
    } else {
      l = unitText.split(" ");
      if (l.length === 2) {
        count = parseInt(l[0], 10);
        unit = l[1];
      } else if (l.length === 1) {
        count = 1;
        unit = l[0];
      } else {
        return null;
      }
    }
    unit = Base_TimeStep.parsingMap[unit];
    if (typeof count !== "number" || !Base_TimeStep.isGoodUnit(unit)) {
      return null;
    }
    s = new Base_TimeStep(unit, count);
    s.name = name;
    return s;
  };

  Base_TimeStep.prototype.clone = function() {
    return new Base_TimeStep(this.unit, this.count);
  };

  Base_TimeStep.prototype.add = function(time, times) {
    if (times == null) {
      times = 1;
    }
    return moment(time).utc().add(this.unit, this.count * times).valueOf();
  };

  Base_TimeStep.prototype.sub = function(time, times) {
    if (times == null) {
      times = 1;
    }
    return moment(time).utc().subtract(this.unit, this.count * times).valueOf();
  };

  Base_TimeStep.prototype.numberOfUnits = function(from, to) {
    return Math.round(moment(to).utc().diff(from, Base_TimeStep.unitsTranslation[this.unit], true) / this.count);
  };

  Base_TimeStep.prototype.toString = function() {
    return "" + this.count + " " + this.unit;
  };

  Base_TimeStep.timeUnitDiffs = {
    "ms": 1,
    "s": 1000,
    "m": 60 * 1000,
    "h": 60 * 60 * 1000,
    "d": 24 * 60 * 60 * 1000,
    "w": 7 * 24 * 60 * 60 * 1000,
    "M": 30 * 24 * 60 * 60 * 1000,
    "y": 365 * 24 * 60 * 60 * 1000
  };

  Base_TimeStep.unitsTranslation = {
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    w: "week",
    M: "month",
    y: "year"
  };

  Base_TimeStep.toBiggerUnit = {
    ms: "s",
    s: "m",
    m: "h",
    h: "d",
    d: "w",
    w: "M",
    M: "y",
    y: null
  };

  Base_TimeStep.toSmallerUnit = {
    ms: null,
    s: "ms",
    m: "s",
    h: "m",
    d: "h",
    w: "d",
    M: "d",
    y: "M"
  };

  Base_TimeStep.prototype.approxTime = function() {
    return Base_TimeStep.timeUnitDiffs[this.unit] * this.count;
  };

  Base_TimeStep.prototype.isSmallerOrEqual = function(bigger) {
    return this.approxTime() <= bigger.approxTime();
  };

  Base_TimeStep.prototype.isSmaller = function(bigger) {
    return this.approxTime() < bigger.approxTime();
  };

  Base_TimeStep.prototype.isBigger = function(smaller) {
    return this.approxTime() > smaller.approxTime();
  };

  Base_TimeStep.prototype.getBigger = function() {
    if (this.unit === "y") {
      return null;
    } else {
      return new Base_TimeStep(Base_TimeStep.toBiggerUnit[this.unit], 1);
    }
  };

  Base_TimeStep.prototype.roundTimeDown = function(t) {
    var times;
    t = Math.round(t);
    times = this.count;
    if (this.unit === "ms") {
      Math.floor(t / times) * times;
    }
    if (this.unit !== "ms") {
      t = moment(t).utc().startOf(Base_TimeStep.unitsTranslation[this.unit]);
    }
    if (this.unit === "y") {
      t.year(Math.floor(t.year() / times) * times);
    } else if (this.unit === "M") {
      t.month(Math.floor(t.month() / times) * times);
    } else if (this.unit === "w") {
      t.week(Math.floor(t.week() / times) * times);
    } else if (this.unit === "d") {
      t.date(Math.floor(t.date() / times) * times);
    } else if (this.unit === "h") {
      t.hours(Math.floor(t.hours() / times) * times);
    } else if (this.unit === "m") {
      t.minutes(Math.floor(t.minutes() / times) * times);
    } else if (this.unit === "s") {
      t.seconds(Math.floor(t.seconds() / times) * times);
    }
    return t.valueOf();
  };

  Base_TimeStep.prototype.roundTimeUp = function(time) {
    return this.roundTimeDown(moment(Math.round(time)).utc().add(this.unit, this.count).valueOf() - 1);
  };

  Base_TimeStep.prototype.roundTimeRound = function(time) {
    var t;
    t = moment(Math.round(time)).utc().add(this.unit, this.count);
    return this.roundTimeDown((t.valueOf() + time - 1) / 2);
  };

  return Base_TimeStep;

})();

/*
//@ sourceMappingURL=TimeStep.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Graphics;

Base_Graphics = (function() {
  "use strict";
  function Base_Graphics() {}

  Base_Graphics.stroke = function(g, st) {
    if (st.lineWidth) {
      g.lineWidth = st.lineWidth;
    }
    g.strokeStyle = st.lineColor;
    g.stroke();
    if (st.lineWidth) {
      return g.lineWidth = 1;
    }
  };

  Base_Graphics.fill = function(g, st) {
    if (!st.fillColor) {
      return;
    }
    g.fillStyle = st.fillColor;
    if (st["shadowColor"]) {
      g.shadowOffsetX = st.shadowOffsetX;
      g.shadowOffsetY = st.shadowOffsetY;
      g.shadowBlur = st.shadowBlur;
      g.shadowColor = st.shadowColor;
    }
    g.fill();
    if (st["shadowColor"]) {
      g.shadowBlur = 0;
      return g.shadowColor = null;
    }
  };

  Base_Graphics.paint = function(g, st) {
    if (st["shadowColor"]) {
      g.shadowOffsetX = st.shadowOffsetX;
      g.shadowOffsetY = st.shadowOffsetY;
      g.shadowBlur = st.shadowBlur;
      g.shadowColor = st.shadowColor;
    }
    if (st.lineColor) {
      g.lineWidth = st.lineWidth ? st.lineWidth : 1;
      g.strokeStyle = st.lineColor;
      g.stroke();
    }
    if (st.fillColor) {
      g.fillStyle = st.fillColor;
      g.fill();
    }
    if (st["shadowColor"]) {
      g.shadowBlur = 0;
      return g.shadowColor = null;
    }
  };

  Base_Graphics.textStyle = function(g, st) {
    if (st.fillColor) {
      g.fillStyle = st.fillColor;
    }
    if (st.font) {
      g.font = st.font;
    }
    if (st["shadowColor"]) {
      g.shadowOffsetX = st.shadowOffsetX;
      g.shadowOffsetY = st.shadowOffsetY;
      g.shadowBlur = st.shadowBlur;
      return g.shadowColor = st.shadowColor;
    }
  };

  Base_Graphics.rectStyle = function(g, st) {
    if (st.hasOwnProperty("lineColor")) {
      g.strokeStyle = st.lineColor;
    }
    if (st.hasOwnProperty("fillColor")) {
      return g.fillStyle = st.fillColor;
    }
  };

  Base_Graphics.pushClip = function(g, x, y, w, h) {
    g.save();
    g.beginPath();
    g.rect(x, y, w, h);
    return g.clip();
  };

  Base_Graphics.popClip = function(g) {
    return g.restore();
  };

  Base_Graphics.strokeMarker = function(g, shape, x, y, r) {
    var d2;
    d2 = r * 1.41421356237;
    if (shape === "rect") {
      g.moveTo(x - r, y - r);
      g.lineTo(x + r, y - r);
      g.lineTo(x + r, y + r);
      g.lineTo(x - r, y + r);
      return g.closePath();
    } else if (shape === "romb") {
      g.moveTo(x - d2, y);
      g.lineTo(x, y - d2);
      g.lineTo(x + d2, y);
      g.lineTo(x, y + d2);
      g.closePath();
      return g.fill();
    } else if (shape === "triangle") {
      g.beginPath();
      g.moveTo(x - d2, y + d2);
      g.lineTo(x + d2, y + d2);
      g.lineTo(x, y - d2);
      g.closePath();
      return g.fill();
    } else if (shape === "triangle2") {
      g.beginPath();
      g.moveTo(x - d2, y - d2);
      g.lineTo(x + d2, y - d2);
      g.lineTo(x, y + d2);
      g.closePath();
      return g.fill();
    } else if (shape === "circle") {
      g.beginPath();
      g.arc(x, y, d, 0, Math.PI * 2, true);
      return g.closePath();
    } else {
      throw "unknown marker shape " + shape;
    }
  };

  Base_Graphics.strokeBalloon = function(g, x0, y0, w, h) {
    var m, r, s, x, y;
    w = Math.max(w, h * 2);
    m = 5;
    s = 4;
    r = (h + s * 2) / 2;
    x = x0;
    y = y0;
    g.moveTo(x, y);
    x += m;
    y += m;
    g.lineTo(x, y);
    x += w / 2 - s - m;
    g.lineTo(x, y);
    g.arc(x, y + r, r, -Math.PI / 2, Math.PI / 2);
    y += r * 2;
    x -= w - 2 * s;
    g.lineTo(x, y);
    g.arc(x, y - r, r, Math.PI * 0.5, Math.PI * 1.5);
    y -= r * 2;
    x += w / 2 - s - m;
    g.lineTo(x, y);
    x += m;
    y -= m;
    g.closePath();
    return y0 + m + r;
  };

  Base_Graphics.strokeBalloon2 = function(g, x0, y0, w, h) {
    var r, s, x, y;
    s = 4;
    r = (h + s * 2) / 2;
    w = Math.max(w, h * 2) / 2 - s;
    x = x0 + w;
    y = y0 - r;
    g.moveTo(x, y);
    g.arc(x, y + r, r, -Math.PI / 2, Math.PI / 2, false);
    y += r * 2;
    x -= w * 2;
    g.lineTo(x, y);
    g.arc(x, y - r, r, Math.PI * 0.5, Math.PI * 1.5, false);
    return g.closePath();
  };

  Base_Graphics.applyColorToImage = function(image, color, ignoreTransparent) {
    var a, b, c, cData, data, g, gr, h, i, r, result, w, _i, _j, _ref, _ref1, _ref2;
    if (ignoreTransparent == null) {
      ignoreTransparent = true;
    }
    _ref = Base_Graphics.parseColor(color), r = _ref[0], g = _ref[1], b = _ref[2], a = _ref[3];
    c = document.createElement("canvas");
    w = c.width = image.width;
    h = c.height = image.height;
    gr = c.getContext("2d");
    gr.drawImage(image, 0, 0);
    cData = gr.getImageData(0, 0, w, h);
    data = cData.data;
    if (ignoreTransparent) {
      for (i = _i = 0, _ref1 = data.length; _i <= _ref1; i = _i += 4) {
        if (data[i + 3] !== 255) {
          continue;
        }
        data[i] = (data[i] * r) >> 8;
        data[i + 1] = (data[i + 1] * g) >> 8;
        data[i + 2] = (data[i + 2] * b) >> 8;
      }
    } else {
      for (i = _j = 0, _ref2 = data.length; _j <= _ref2; i = _j += 4) {
        data[i] = (data[i] * r) >> 8;
        data[i + 1] = (data[i + 1] * g) >> 8;
        data[i + 2] = (data[i + 2] * b) >> 8;
      }
    }
    gr.putImageData(cData, 0, 0);
    result = new Image();
    result.src = c.toDataURL("image/png");
    return result;
  };

  Base_Graphics.parseColor = function(color) {
    return Base_CssColorParser.parseCSSColor(color);
  };

  Base_Graphics.deriveColor = function(color, lighten, opacity) {
    var a, b, g, r, _ref;
    _ref = Base_Graphics.parseColor(color), r = _ref[0], g = _ref[1], b = _ref[2], a = _ref[3];
    r = Math.round(r * lighten);
    g = Math.round(g * lighten);
    b = Math.round(b * lighten);
    a = a * opacity;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  Base_Graphics.blendColors = function(c0, c1, proportion) {
    var a, a0, a1, b, b0, b1, g, g0, g1, r, r0, r1, _ref, _ref1;
    _ref = Base_Graphics.parseColor(c0), r0 = _ref[0], g0 = _ref[1], b0 = _ref[2], a0 = _ref[3];
    _ref1 = Base_Graphics.parseColor(c1), r1 = _ref1[0], g1 = _ref1[1], b1 = _ref1[2], a1 = _ref1[3];
    r = Math.round(r1 * proportion + r0 * (1 - proportion));
    g = Math.round(g1 * proportion + g0 * (1 - proportion));
    b = Math.round(b1 * proportion + b0 * (1 - proportion));
    a = a1 * proportion + a0 * (1 - proportion);
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  Base_Graphics.copyHue = function(hue, brightness) {
    var a, a0, a1, b, b0, b1, br0, br1, g, g0, g1, r, r0, r1, _ref, _ref1;
    _ref = Base_Graphics.parseColor(hue), r0 = _ref[0], g0 = _ref[1], b0 = _ref[2], a0 = _ref[3];
    _ref1 = Base_Graphics.parseColor(brightness), r1 = _ref1[0], g1 = _ref1[1], b1 = _ref1[2], a1 = _ref1[3];
    br0 = (r0 + g0 + b0) / 765;
    br1 = (r1 + g1 + b1) / 765;
    r = Math.round(r0 / br0 * br1);
    g = Math.round(g0 / br0 * br1);
    b = Math.round(b0 / br0 * br1);
    a = a1;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  Base_Graphics.inverseColor = function(c0) {
    var a, b, g, r, _ref;
    _ref = Base_Graphics.parseColor(c0), r = _ref[0], g = _ref[1], b = _ref[2], a = _ref[3];
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  Base_Graphics.randomizeColor = function(color, seedStr, randomness) {
    var a, b, g, hash, i, r, r1, r2, r3, random, _i, _ref, _ref1;
    hash = 2147483647;
    for (i = _i = 0, _ref = seedStr.length - 1; _i <= _ref; i = _i += 1) {
      hash = (((hash << 5) - hash) + seedStr.charCodeAt(i) * 48271) | 0;
    }
    random = Math.abs((hash * 2147483647) | 0);
    r1 = (random % 256 - 128) * randomness;
    r2 = ((random >> 8) % 256 - 128) * randomness;
    r3 = ((random >> 16) % 256 - 128) * randomness;
    _ref1 = Base_Graphics.parseColor(color), r = _ref1[0], g = _ref1[1], b = _ref1[2], a = _ref1[3];
    r = Math.min(255, Math.max(0, r + r1)) | 0;
    g = Math.min(255, Math.max(0, g + r2)) | 0;
    b = Math.min(255, Math.max(0, b + r3)) | 0;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  Base_Graphics.applyShadow = function(g, style) {
    if (style.shadowColor) {
      g.shadowOffsetX = style.shadowOffsetX;
      g.shadowOffsetY = style.shadowOffsetY;
      g.shadowBlur = style.shadowBlur;
      return g.shadowColor = style.shadowColor;
    }
  };

  Base_Graphics.clearShadow = function(g) {
    g.shadowOffsetX = 0;
    g.shadowOffsetY = 0;
    g.shadowBlur = 0;
    return g.shadowColor = "";
  };

  return Base_Graphics;

})();

/*
//@ sourceMappingURL=Graphics.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_TimeSetup;

Timechart_TimeSetup = (function() {
  "use strict";
  Timechart_TimeSetup.prototype.settigns = null;

  function Timechart_TimeSetup(settings) {
    this.settings = settings;
    true;
  }

  Timechart_TimeSetup.isSmallerOrEqualUnit = function(smaller, bigger) {
    return Base_TimeStep.timeUnitDiffs[smaller] <= Base_TimeStep.timeUnitDiffs[bigger];
  };

  Timechart_TimeSetup.isSmallerUnit = function(smaller, bigger) {
    return Base_TimeStep.timeUnitDiffs[smaller] < Base_TimeStep.timeUnitDiffs[bigger];
  };

  Timechart_TimeSetup.prototype.toBiggerDisplayPeriod = function(unit) {
    var best, p, _i, _len, _ref;
    best = null;
    _ref = this.settings.area.displayPeriodsParsed;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if ((p.displayPeriod != null) && p.displayPeriod.approxTime() > unit.approxTime() && (best === null || p.displayPeriod.approxTime() < best.approxTime())) {
        best = p.displayPeriod;
      }
    }
    return best;
  };

  Timechart_TimeSetup.prototype.getBiggerDisplayPeriod = function(from, to) {
    var best, bestD, dt, p, proportion, unitdt, _i, _len, _ref;
    dt = Math.abs(to - from);
    bestD = 0;
    best = null;
    _ref = this.settings.area.displayPeriodsParsed;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (!((p.displayPeriod != null) && (p.displayPeriod.unit != null))) {
        continue;
      }
      unitdt = p.displayPeriod.approxTime();
      proportion = dt / unitdt;
      if (proportion < 0.9 && proportion > bestD) {
        bestD = proportion;
        best = p;
      }
    }
    return best;
  };

  Timechart_TimeSetup.prototype.getClosestDisplayPeriod = function(dt, unitHint, allowMultiples) {
    var above, aboveT, below, belowT, p, pt, _i, _len, _ref;
    below = null;
    belowT = 0;
    above = null;
    aboveT = Infinity;
    _ref = this.settings.area.displayPeriodsParsed;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (!((p.displayPeriod != null) && (p.displayPeriod.unit != null))) {
        continue;
      }
      pt = p.displayPeriod.approxTime();
      if (pt <= dt && ((below == null) || belowT < pt)) {
        below = p;
        belowT = pt;
      }
      if (pt >= dt && ((above == null) || aboveT > pt)) {
        above = p;
        aboveT = pt;
      }
    }
    if (allowMultiples) {
      if ((unitHint != null) && unitHint.approxTime() < dt * 0.8) {
        return {
          displayPeriod: unitHint
        };
      }
      if (((above != null) && aboveT < dt * 1.2) || (below == null)) {
        return above;
      } else {
        return below;
      }
    } else {
      if ((below != null) && (belowT > dt * 0.8 || aboveT > dt * 1.2)) {
        return below;
      } else {
        return above;
      }
    }
  };

  Timechart_TimeSetup.prototype.isAllowedDisplayUnit = function(unit) {
    var u, _i, _len, _ref;
    _ref = this.settings.area.displayUnitsParsed;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      u = _ref[_i];
      if (u.step === unit.step && (u.count = unit.count)) {
        return true;
      }
    }
    return false;
  };

  Timechart_TimeSetup.prototype.computeDisplayUnit = function(oldFrom, oldTo, oldUnit, from, to, scene) {
    var diff, displayUnit, displayUnitDiff, maxUnitTime, maxUnitWidth, minUnitTime, oldUnitTime, step, width, zoom, _i, _len, _ref;
    width = Math.max(scene.width, 10);
    maxUnitWidth = Math.min(width / 3, scene.displayUnitMaxSize);
    minUnitTime = (to - from) / width * scene.displayUnitMinSize;
    maxUnitTime = (to - from) / width * maxUnitWidth;
    if ((oldFrom != null) && (oldTo != null) && (oldUnit != null)) {
      zoom = (oldTo - oldFrom) / (to - from);
      oldUnitTime = oldUnit.approxTime();
      if (zoom === 1) {
        return oldUnit;
      } else if (zoom > 1) {
        if (oldUnitTime <= maxUnitTime) {
          return oldUnit;
        }
      } else {
        if (oldUnitTime >= minUnitTime) {
          return oldUnit;
        }
      }
    }
    displayUnit = null;
    displayUnitDiff = 0;
    _ref = this.settings.area.displayUnitsParsed;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      step = _ref[_i];
      if (step.approxTime() < this.settings.area.minUnit.approxTime()) {
        continue;
      }
      diff = step.approxTime();
      if (displayUnit === null || (diff < maxUnitTime && diff > displayUnitDiff) || (displayUnitDiff > maxUnitTime && diff < displayUnit)) {
        displayUnit = step;
        displayUnitDiff = diff;
      }
    }
    if (!displayUnit) {
      console.error(oldFrom, oldTo, oldUnit, from, to, width);
      throw "Could not calculate displayUnit";
    }
    return displayUnit;
  };

  /*
    Compute the period.
    Snapping to bars will be done later.
  */


  Timechart_TimeSetup.prototype.tryComputeDisplayPeriod = function(periodStr, anchorStr, unitStr, dataFrom, dataTo, scene, curTime) {
    var anchor, dataDirection, from, fromS, maxTimeScale, maxUnit, minTimeScale, minUnit, period, to, toS, unit, _ref, _ref1;
    from = null;
    to = null;
    if ((periodStr != null) && Base_Helpers.arrayContains(periodStr, ">")) {
      _ref = periodStr.split(">"), fromS = _ref[0], toS = _ref[1];
      from = parseInt(fromS);
      to = parseInt(toS);
      dataDirection = -1;
    } else {
      dataDirection = anchorStr === "oldestData" ? 1 : -1;
      if (periodStr === "max" && (dataFrom != null) && (dataTo != null)) {
        from = dataFrom;
        to = anchorStr === "now" ? curTime : dataTo;
      } else if (periodStr !== "max") {
        period = Base_TimeStep.parse(periodStr);
        if (anchorStr === "now") {
          anchor = curTime;
        } else if (anchorStr === "newestData" && (dataTo != null)) {
          anchor = dataTo;
        } else if (anchorStr === "oldestData" && (dataFrom != null)) {
          anchor = dataFrom;
        } else if (Base_Helpers.isNumber(anchorStr)) {
          anchor = parseFloat(anchorStr);
        }
        if ((period != null) && (anchor != null)) {
          from = dataDirection === 1 ? anchor : period.sub(anchor);
          to = dataDirection === -1 ? anchor : period.add(anchor);
        }
      }
    }
    if (from === null || to === null) {
      return [null, null, null];
    }
    _ref1 = this.computeTimeScaleRange(scene), minTimeScale = _ref1[0], maxTimeScale = _ref1[1], minUnit = _ref1[2], maxUnit = _ref1[3];
    unit = unitStr === "auto" ? null : Base_TimeStep.parse(unitStr);
    if (to - from > maxTimeScale) {
      unit = maxUnit;
      if (dataDirection === -1) {
        from = to - maxTimeScale;
      } else {
        to = from + maxTimeScale;
      }
    }
    if (to - from < minTimeScale) {
      unit = minUnit;
      if (dataDirection === -1) {
        from = to - minTimeScale;
      } else {
        to = from + minTimeScale;
      }
    }
    return [from, to, unit];
  };

  Timechart_TimeSetup.prototype.computeTimeScaleRange = function(scene, unitSteps) {
    var diff, maxDiff, maxTime, maxUnit, minDiff, minTime, minUnit, step, width, _i, _len;
    if (unitSteps == null) {
      unitSteps = this.settings.area.displayUnitsParsed;
    }
    minUnit = null;
    minDiff = 0;
    maxUnit = null;
    maxDiff = Infinity;
    for (_i = 0, _len = unitSteps.length; _i < _len; _i++) {
      step = unitSteps[_i];
      diff = step.approxTime();
      if (minUnit === null || minDiff > diff) {
        minUnit = step;
        minDiff = diff;
      }
      if (maxUnit === null || maxDiff < diff) {
        maxUnit = step;
        maxDiff = diff;
      }
    }
    width = Math.max(10, scene.width);
    maxTime = width / scene.displayUnitMinSize * maxDiff;
    minTime = width / scene.displayUnitMaxSize * minDiff;
    return [minTime, maxTime, minUnit, maxUnit];
  };

  Timechart_TimeSetup.prototype.preventOverscale = function(scene, units, origin, from, to, dataFrom, dataTo) {
    var dataTime, downscale, maxTime, minTime, time, _ref;
    _ref = this.computeTimeScaleRange(scene, units), minTime = _ref[0], maxTime = _ref[1];
    maxTime *= 0.99;
    minTime *= 1.01;
    time = to - from;
    if ((dataTo != null) && (dataFrom != null)) {
      dataTime = (dataTo - dataFrom) * this.settings.advanced.maxZoomOutFactor;
      time = Math.min(time, dataTime);
    }
    time = Math.min(time, maxTime);
    time = Math.max(time, minTime);
    downscale = time / (to - from);
    if (origin == null) {
      origin = (from + to) / 2;
    }
    if (from === to) {
      console.error("From = To, trouble", from, to);
    }
    return [origin + (from - origin) * downscale, origin + (to - origin) * downscale];
  };

  Timechart_TimeSetup.prototype.preventOverscroll = function(unit, from, to, dataFrom, dataTo) {
    var dfrom, dfrom0, diff, dto, dto0, proportion;
    dataFrom = unit.roundTimeDown(dataFrom);
    dataTo = unit.roundTimeUp(dataTo);
    diff = to - from;
    proportion = this.settings.interaction.scrolling.noDataSnapBackProportion;
    dfrom0 = dataFrom - from;
    dto0 = dataTo - to;
    dataFrom -= diff * (1 - proportion);
    dataTo += diff * (1 - proportion);
    dfrom = dataFrom - from;
    dto = dataTo - to;
    if (dfrom0 > 0 && dto0 < 0) {
      1;
    } else if (dfrom > 0) {
      from += Math.min(dfrom, dto);
      to += Math.min(dfrom, dto);
    } else if (dto < 0) {
      from += Math.max(dfrom, dto);
      to += Math.max(dfrom, dto);
    }
    return [from, to];
  };

  Timechart_TimeSetup.prototype.scroll = function(from, to, displayUnit, direction, count, unit) {
    var step;
    if (unit === "displayUnit") {
      step = displayUnit.clone();
    } else if (unit === "page") {
      step = this.getTimeRangeStep(from, to);
    } else if (Base_TimeStep.isGoodUnit(unit)) {
      step = Base_TimeStep.parse(unit);
    } else {
      Base_Helpers.error("Incorrect scroll unit: " + unit);
      return;
    }
    step.count *= count;
    if (direction === "<") {
      return [step.sub(from), step.sub(to)];
    } else {
      return [step.add(from), step.add(to)];
    }
  };

  Timechart_TimeSetup.prototype.getTimeRangeStep = function(from, to) {
    var biggestStep, ff, step, tt, unit, _i, _len, _ref;
    from = Math.round(from);
    to = Math.round(to);
    biggestStep = null;
    _ref = Base_TimeStep.knownUnits;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      unit = _ref[_i];
      step = new Base_TimeStep(unit, 1);
      ff = step.roundTimeRound(from);
      tt = step.roundTimeRound(to);
      if (from === ff && to === tt && (biggestStep === null || biggestStep.approxTime() < step.approxTime())) {
        biggestStep = step;
      }
    }
    biggestStep.count = Math.max(1, biggestStep.numberOfUnits(from, to));
    return biggestStep;
  };

  Timechart_TimeSetup.prototype.getBiggerDataUnit = function(unit) {
    while (unit != null) {
      unit = Base_TimeStep.toBiggerUnit[unit];
      if (Base_Helpers.arrayContains(this.settings.data.units, unit)) {
        return unit;
      }
    }
    return null;
  };

  return Timechart_TimeSetup;

})();

/*
//@ sourceMappingURL=TimeSetup.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Animator, Base_StatelessAnimator;

Base_StatelessAnimator = (function() {
  function Base_StatelessAnimator(duration, dt, treshold) {
    this.treshold = treshold;
    this.fadeProp = Math.max(0, Math.pow(0.2, dt / duration));
    this.animating = false;
    this.changes = false;
  }

  Base_StatelessAnimator.prototype.animate = function(current, target) {
    var v;
    if (current === target) {
      return current;
    } else if (!current && current !== 0) {
      this.changes = true;
      return target;
    } else {
      this.changes = true;
      v = current * this.fadeProp + target * (1 - this.fadeProp);
      if (Math.abs(v - target) < this.treshold * target) {
        v = target;
      } else {
        this.animating = true;
      }
      return v;
    }
  };

  return Base_StatelessAnimator;

})();

Base_Animator = (function() {
  "use strict";
  Base_Animator.prototype.formula = null;

  Base_Animator.prototype.startTime = null;

  Base_Animator.prototype.from = 0;

  Base_Animator.prototype.to = 0;

  Base_Animator.prototype.fromColor = null;

  Base_Animator.prototype.toColor = null;

  Base_Animator.prototype.t = 0;

  Base_Animator.prototype.startSpeed = 0;

  Base_Animator.prototype.easing_formulas = {
    "=": function(t) {
      return t;
    },
    "<>": function(t) {
      if (t < 0.5) {
        return 2 * t * t;
      } else {
        return -0.5 * ((t * 2 - 1) * (t * 2 - 3) - 1);
      }
    },
    "scroll": function(t) {
      return 1 - (1 - t) * (1 - t);
    }
  };

  function Base_Animator(from, to, duration, easing, startTime) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    if (easing == null) {
      easing = "<>";
    }
    this.startTime = startTime === void 0 ? new Date().getTime() : startTime;
    this.x = this.from;
    this.t = this.startTime;
    if (!this.easing_formulas[easing]) {
      throw "Easing formula not defined: " + easing;
    } else {
      this.formula = this.easing_formulas[easing];
    }
  }

  Base_Animator.prototype.retarget = function(newTo, startTime) {
    startTime = startTime === void 0 ? new Date().getTime() : startTime;
    if (this.finished(this.t)) {
      this.startSpeed = 0;
    } else {
      this.startSpeed = this._getSpeed();
    }
    this.from = this.get(startTime);
    this.to = newTo;
    this.startTime = startTime;
    return this;
  };

  Base_Animator.prototype.get = function(time) {
    var easingPerc, percentage, spx, xx;
    if (this.duration <= 0) {
      return this.to;
    }
    percentage = Math.min(1, Math.max(time - this.startTime, 0) / this.duration);
    easingPerc = this.formula(percentage);
    xx = easingPerc * (this.to - this.from);
    if (this.startSpeed && percentage < 1) {
      spx = this.startSpeed * percentage * this.duration;
      xx = xx * easingPerc + spx * (1 - easingPerc);
    }
    xx = this.from + xx;
    this.t = time;
    this.x = xx;
    return xx;
  };

  Base_Animator.prototype.getColor = function(time) {
    var fa, fb, fg, fr, p0, p1, percentage, ta, tb, tg, tr, _ref, _ref1;
    this.t = time;
    if (this.duration <= 0 || this.from === this.to) {
      return this.to;
    }
    if (this.fromColor == null) {
      this.fromColor = Base_CssColorParser.parseCSSColor(this.from);
    }
    if (this.toColor == null) {
      this.toColor = Base_CssColorParser.parseCSSColor(this.to);
    }
    percentage = Math.min(1, Math.max(time - this.startTime, 0) / this.duration);
    p1 = this.formula(percentage);
    p0 = 1 - p1;
    _ref = this.fromColor, fr = _ref[0], fg = _ref[1], fb = _ref[2], fa = _ref[3];
    _ref1 = this.toColor, tr = _ref1[0], tg = _ref1[1], tb = _ref1[2], ta = _ref1[3];
    return "rgba(" + (Math.round(fr * p0 + tr * p1)) + "," + (Math.round(fg * p0 + tg * p1)) + ", " + (Math.round(fb * p0 + tb * p1)) + ", " + (fa * p0 + ta * p1) + ")";
  };

  Base_Animator.prototype.finished = function(time) {
    return time >= this.startTime + this.duration;
  };

  Base_Animator.prototype._getSpeed = function() {
    var d, p0, p1, time;
    time = this.t;
    d = this.duration / 1000;
    p0 = this.get(time - d / 2);
    p1 = this.get(time + d / 2);
    this.t = time;
    return (p1 - p0) / d;
  };

  return Base_Animator;

})();

/*
//@ sourceMappingURL=Animator.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_ValueAxis;

Timechart_ValueAxis = (function() {
  "use strict";
  Timechart_ValueAxis.prototype.lastMaxValue = 0;

  Timechart_ValueAxis.prototype.lastMinValue = 0;

  Timechart_ValueAxis.prototype.minValue = 0;

  Timechart_ValueAxis.prototype.maxValue = 0;

  Timechart_ValueAxis.prototype.scale = 0;

  Timechart_ValueAxis.prototype.absoluteMidpoint = 0;

  Timechart_ValueAxis.prototype.logOffset = 1;

  Timechart_ValueAxis.prototype.minValueAnimation = null;

  Timechart_ValueAxis.prototype.maxValueAnimation = null;

  Timechart_ValueAxis.prototype.axisChanged = false;

  Timechart_ValueAxis.prototype.seriesDepth = 0;

  Timechart_ValueAxis.prototype.seriesMinValue = void 0;

  Timechart_ValueAxis.prototype.seriesMaxValue = void 0;

  Timechart_ValueAxis.prototype.series = 0;

  Timechart_ValueAxis.prototype.debug = false;

  function Timechart_ValueAxis(r, name, options) {
    this.name = name;
    this.options = options;
    this.events = r.events;
    this.scene = r.scene;
    this.isLogScale = this.options.logScale;
    this.isInside = this.options.position === "inside";
    this.locations = [];
    this.values = [];
    this.cachedUnits = [];
  }

  Timechart_ValueAxis.prototype.recieveSeriesGeometry = function(min, max, depth) {
    if (min !== void 0) {
      if (this.seriesMinValue !== void 0) {
        this.seriesMinValue = Math.min(min, this.seriesMinValue);
      } else {
        this.seriesMinValue = min;
      }
    }
    if (max !== void 0) {
      if (this.seriesMaxValue !== void 0) {
        this.seriesMaxValue = Math.max(max, this.seriesMaxValue);
      } else {
        this.seriesMaxValue = max;
      }
      return this.seriesDepth = Math.max(depth, this.seriesDepth);
    }
  };

  Timechart_ValueAxis.prototype.process = function(event) {
    var hasChanges, max, min;
    hasChanges = event.changes.bounds || false;
    if (event.changes.settings) {
      this.isLogScale = this.options.logScale;
      this.isInside = this.options.position === "inside";
      hasChanges = true;
    }
    if (this.shouldChangeScale()) {
      if (this.seriesMinValue !== this.lastMinValue) {
        hasChanges = true;
        if ((this.lastMinValue == null) || event.changes.displayUnit || this.minValue === this.maxValue) {
          this.minValueAnimation = null;
        } else {
          if (this.minValueAnimation != null) {
            this.minValueAnimation.retarget(this.seriesMinValue);
          } else {
            this.minValueAnimation = new Base_Animator(this.lastMinValue, this.seriesMinValue, this.options.scaleAdjustmentAnimationDelay, this.options.scaleAdjustmentAnimation, event.time);
          }
        }
        this.lastMinValue = this.seriesMinValue;
      }
      if (this.seriesMaxValue !== this.lastMaxValue) {
        hasChanges = true;
        if ((this.lastMaxValue == null) || event.changes.displayUnit || this.minValue === this.maxValue) {
          this.maxValueAnimation = null;
        } else {
          if (this.maxValueAnimation != null) {
            this.maxValueAnimation.retarget(this.seriesMaxValue);
          } else {
            this.maxValueAnimation = new Base_Animator(this.lastMaxValue, this.seriesMaxValue, this.options.scaleAdjustmentAnimationDelay, this.options.scaleAdjustmentAnimation, event.time);
          }
        }
        this.lastMaxValue = this.seriesMaxValue;
      }
    }
    this.seriesMaxValue = void 0;
    this.seriesMinValue = void 0;
    if (this.minValueAnimation) {
      hasChanges = true;
      min = this.minValueAnimation.get(event.time);
      if (this.minValueAnimation.finished(event.time)) {
        this.minValueAnimation = null;
      }
    } else {
      min = this.lastMinValue;
    }
    if (this.maxValueAnimation) {
      hasChanges = true;
      max = this.maxValueAnimation.get(event.time);
      if (this.maxValueAnimation.finished(event.time)) {
        this.maxValueAnimation = null;
      }
    } else {
      max = this.lastMaxValue;
    }
    this.axisChanged = hasChanges;
    if (hasChanges) {
      this.computeNewScale(min, max);
    }
    if (this.minValueAnimation || this.maxValueAnimation) {
      return event.animating = true;
    }
  };

  Timechart_ValueAxis.prototype.afterProcess = function(event) {
    var logMul, logUnit, textAboveLine, value, valuePerLine, valueY, y0, y1, _ref;
    if (!this.axisChanged) {
      return;
    }
    this.axisChanged = false;
    if (!this.options.enabled) {
      return;
    }
    this.locations = [];
    this.values = [];
    textAboveLine = parseInt(this.options.style.valueLabel.font) / 2 * 1.5;
    if (!(this.scale > 0)) {
      return;
    }
    y0 = this.scene.y0;
    y1 = y0 + this.scene.height;
    if (!this.isLogScale) {
      valuePerLine = this.calcLinearValuePerLine();
      value = 0;
      while (true) {
        value += valuePerLine;
        valueY = this.absoluteMidpoint - this.valueToRelativeY(value);
        if (valueY - textAboveLine <= y0) {
          break;
        }
        this.locations.push(valueY | 0);
        this.values.push(value);
      }
      value = 0;
      while (true) {
        value -= valuePerLine;
        valueY = this.absoluteMidpoint - this.valueToRelativeY(value);
        if (valueY >= y1) {
          break;
        }
        this.locations.push(valueY | 0);
        this.values.push(value);
      }
    } else {
      _ref = this.calcExpValuePerLine(), logUnit = _ref[0], logMul = _ref[1];
      value = 1 / logUnit;
      while (true) {
        value *= logMul;
        valueY = this.absoluteMidpoint - this.valueToRelativeY(value);
        if (valueY - textAboveLine < y0) {
          break;
        }
        this.locations.push((valueY | 0) - 0.5);
        this.values.push(value);
      }
      value = -1 / logUnit;
      while (true) {
        value *= logMul;
        valueY = this.absoluteMidpoint - this.valueToRelativeY(value);
        if (valueY >= y1) {
          break;
        }
        this.locations.push((valueY | 0) - 0.5);
        this.values.push(value);
      }
    }
    if (this.minValue < 0 && this.maxValue > 0) {
      this.locations.push(this.absoluteMidpoint | 0);
      return this.values.push(0);
    }
  };

  Timechart_ValueAxis.prototype.paint = function(context, seriesContext) {
    if (this.options.enabled && this.series > 0 && this.locations.length > 0) {
      this.paintGrid(seriesContext);
      this.paintZeroLine(seriesContext);
      return this.paintLabels(context);
    }
  };

  Timechart_ValueAxis.prototype.shouldChangeScale = function() {
    var tolerance;
    if (this.seriesMinValue === void 0 || this.seriesMaxValue === void 0) {
      return false;
    }
    if (this.lastMinValue === void 0 || this.lastMaxValue === void 0 || !(this.lastMinValue < this.lastMaxValue)) {
      return true;
    }
    if (this.seriesMinValue < this.minValue || this.seriesMaxValue > this.maxValue) {
      return true;
    }
    tolerance = 1 + this.options.scaleAdjustmentTolerance;
    if (this.seriesMinValue < 0 && this.seriesMinValue > this.lastMinValue / tolerance) {
      return true;
    }
    if (this.seriesMaxValue > 0 && this.seriesMaxValue < this.lastMaxValue / tolerance) {
      return true;
    }
    return false;
  };

  Timechart_ValueAxis.prototype.computeNewScale = function(min, max) {
    var height, range, topPos, y0;
    height = this.scene.height;
    y0 = this.scene.y0;
    if (this.options.zeroLine === "center") {
      max = Math.max(max, -min);
      min = -max;
    } else if (this.options.zeroLine === "visible") {
      min = Math.min(min, 0);
      max = Math.max(max, 0);
    }
    if (!height > 0 || !(min < max)) {
      this.minValue = 0;
      this.maxValue = 0;
      this.logOffset = 1;
      this.scale = 0;
      this.absoluteMidpoint = y0 + height;
      return;
    }
    if (min !== -100) {
      if (this.isLogScale) {
        min = Base_Helpers.sign(min) * Math.pow(Math.abs(min), 1 + this.options.scaleAdjustmentTolerance);
      } else {
        min = min * (1 + this.options.scaleAdjustmentTolerance);
      }
    }
    if (max !== 100) {
      if (this.isLogScale) {
        max = Base_Helpers.sign(max) * Math.pow(Math.abs(max), 1 + this.options.scaleAdjustmentTolerance);
      } else {
        max = max * (1 + this.options.scaleAdjustmentTolerance);
      }
    }
    this.minValue = min;
    this.maxValue = max;
    if (!this.isLogScale) {
      range = max - min;
    } else {
      if (min <= 0 || max >= 0) {
        this.logOffset = 1;
        range = Math.log(max + this.logOffset) + Math.log(-min + this.logOffset);
      } else if (min < 0) {
        this.logOffset = 1 - min;
        range = Math.log(max + this.logOffset);
      } else if (max > 0) {
        this.logOffset = 1 + max;
        range = Math.log(-min + this.logOffset);
      }
    }
    this.scale = height / range;
    topPos = this.valueToRelativeY(min);
    return this.absoluteMidpoint = y0 + height + topPos;
  };

  Timechart_ValueAxis.prototype.valueToRelativeY = function(value) {
    if (!this.isLogScale) {
      return this.scale * value;
    } else {
      if (value > 0) {
        return this.scale * Math.log(value + this.logOffset);
      } else if (value < 0) {
        return -this.scale * Math.log(-value + this.logOffset);
      } else {
        return 0;
      }
    }
  };

  Timechart_ValueAxis.prototype.calcLinearValuePerLine = function() {
    var base, desired, orderOfMagnitude;
    desired = this.options.style.labelSpacing / this.scale;
    orderOfMagnitude = Math.log(desired) / Math.log(10);
    base = Math.pow(10, Math.floor(orderOfMagnitude - 1));
    while (base < desired) {
      if (base * 2 >= desired) {
        return base * 2;
      }
      if (base > 10 && base * 2.5 >= desired) {
        return base * 2.5;
      }
      if (base * 5 >= desired) {
        return base * 5;
      }
      base *= 10;
    }
    return base;
  };

  Timechart_ValueAxis.prototype.calcExpValuePerLine = function() {
    var pixelsPer10Times, stepSize, unit, valueMultiplier;
    pixelsPer10Times = this.valueToRelativeY(10) - this.valueToRelativeY(1);
    valueMultiplier = 10;
    unit = 10;
    stepSize = pixelsPer10Times;
    if (stepSize > this.options.style.labelSpacing * 4) {
      return [2, 2];
    }
    while (stepSize < this.options.style.labelSpacing) {
      valueMultiplier *= 10;
      stepSize += pixelsPer10Times;
    }
    return [unit, valueMultiplier];
  };

  Timechart_ValueAxis.prototype.getUnitAndName = function(base, settings) {
    var digitsAfterComma, i, m, name, s, u, unit, x, _ref;
    i = this.isLogScale ? "log" : "lin";
    if (typeof this.cachedUnits[i] === "undefined") {
      this.cachedUnits[i] = [];
    }
    unit = 1;
    name = "";
    if (this.cachedUnits[i][base]) {
      return this.cachedUnits[i][base];
    }
    _ref = settings.localization.valueUnits;
    for (u in _ref) {
      m = _ref[u];
      s = Math.abs(base / m);
      if (i === "lin") {
        if (s < 1000 && s >= 1) {
          unit = m;
          name = u;
          break;
        }
      } else if (i === "log") {
        if (base === Math.round(base / m) * m && unit < m) {
          unit = m;
          name = u;
        }
      }
    }
    digitsAfterComma = 0;
    x = 1;
    while (base < x) {
      digitsAfterComma += 1;
      x /= 10;
    }
    this.cachedUnits[i][base] = [unit, digitsAfterComma, name];
    return [unit, digitsAfterComma, name];
  };

  Timechart_ValueAxis.prototype.paintGrid = function(g) {
    var i, x1, x2, y, _i, _j, _len, _len1, _ref, _ref1;
    if (!this.options.hgrid) {
      return;
    }
    x1 = this.scene.x0;
    x2 = this.scene.x0 + this.scene.width;
    g.beginPath();
    g.lineWidth = 1;
    _ref = this.locations;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      y = _ref[i];
      if (this.values[i] === 0) {
        continue;
      }
      g.moveTo(x1, y);
      g.lineTo(x2, y);
    }
    Base_Graphics.stroke(g, this.options.style.hgrid1);
    if (this.options.style.hgrid2 != null) {
      g.beginPath();
      _ref1 = this.locations;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        y = _ref1[i];
        if (this.values[i] === 0) {
          continue;
        }
        g.moveTo(x1, y + 1);
        g.lineTo(x2, y + 1);
      }
      return Base_Graphics.stroke(g, this.options.style.hgrid2);
    }
  };

  Timechart_ValueAxis.prototype.paintZeroLine = function(g) {
    var d, x1, x2, z;
    d = Math.max(this.options.style.baseLineDepth, this.seriesDepth);
    x1 = this.scene.x0;
    x2 = this.scene.x0 + this.scene.width;
    z = this.absoluteMidpoint;
    g.beginPath();
    if (d > 0) {
      g.fillStyle = this.options.style.baseLineFillStyle;
      g.lineWidth = this.options.style.baseLineWidth;
      g.moveTo(x1, z);
      g.lineTo(x1 + d, z - d);
      g.lineTo(x2, z - d);
      g.lineTo(x2, z);
      g.closePath();
      return g.fill();
    } else {
      g.strokeStyle = this.options.style.baseLineStyle;
      g.lineWidth = Math.max(1, this.options.style.baseLineWidth);
      g.moveTo(x1, z);
      g.lineTo(x2, z);
      return g.stroke();
    }
  };

  Timechart_ValueAxis.prototype.paintLabels = function(g) {
    var fractionDigits, i, labelX, name, tickx, unitMultiplier, unitName, value, valueY, x0, x1, y, _i, _j, _len, _ref, _ref1, _ref2, _ref3;
    if (this.options.side === "right") {
      x0 = this.scene.x0 + this.scene.width;
      x1 = x0 + this.options.size;
    } else {
      x0 = 0;
      x1 = x0 + this.options.size;
    }
    if (this.isInside) {
      g.textAlign = "center";
      g.textBaseline = "middle";
      labelX = (x0 + x1) / 2;
    } else if (this.options.side === "right") {
      g.textAlign = "start";
      g.textBaseline = "middle";
      tickx = x0;
      labelX = x0 + 7;
    } else {
      g.textAlign = "end";
      g.textBaseline = "middle";
      tickx = x1 - 4;
      labelX = x1 - 7;
    }
    if (!this.isInside) {
      g.beginPath();
      _ref = this.locations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        y = _ref[_i];
        g.moveTo(tickx, y);
        g.lineTo(tickx + 4, y);
      }
      Base_Graphics.stroke(g, this.options.style.tick);
    }
    g.save();
    g.lineWidth = 0;
    g.strokeStyle = "";
    g.shadowOffsetX = 0;
    g.shadowOffsetY = 0;
    Base_Graphics.textStyle(g, this.options.style.valueLabel);
    for (i = _j = 0, _ref1 = this.locations.length - 1; _j <= _ref1; i = _j += 1) {
      value = this.values[i];
      valueY = this.locations[i];
      if (this.isLogScale) {
        _ref2 = this.getUnitAndName(value, this.scene.settings), unitMultiplier = _ref2[0], fractionDigits = _ref2[1], unitName = _ref2[2];
      } else {
        _ref3 = this.getUnitAndName(this.values[0], this.scene.settings), unitMultiplier = _ref3[0], fractionDigits = _ref3[1], unitName = _ref3[2];
      }
      name = (value / unitMultiplier).toFixed(fractionDigits);
      if (unitMultiplier !== "" && value) {
        name = name + " " + unitName;
      }
      if (this.isInside) {
        g.fillText(name, labelX, valueY);
      } else {
        g.fillText(name, labelX, valueY);
      }
    }
    g.restore();
  };

  return Timechart_ValueAxis;

})();

/*
//@ sourceMappingURL=ValueAxis.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Helpers, lastTime, requestAnimationFrame,
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };
}

requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

if (!requestAnimationFrame) {
  lastTime = 0;
  requestAnimationFrame = function(callback) {
    var currTime, id, timeToCall;
    currTime = new Date().getTime();
    timeToCall = Math.max(0, 16 - (currTime - lastTime));
    id = window.setTimeout(function() {
      return callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

window.requestAnimationFrame = requestAnimationFrame;

Base_Helpers = (function() {
  "use strict";
  function Base_Helpers() {}

  Base_Helpers.prototype.baseCSSClass = "DWSL";

  Base_Helpers.extend = function(object, other) {
    var key, val;
    if (object == null) {
      return {};
    }
    for (key in other) {
      if (!__hasProp.call(other, key)) continue;
      val = other[key];
      object[key] = val;
    }
    return object;
  };

  Base_Helpers.extendTrue = function(object, other) {
    var key, val;
    if (object == null) {
      return {};
    }
    for (key in other) {
      if (!__hasProp.call(other, key)) continue;
      val = other[key];
      if (val) {
        object[key] = val;
      }
    }
    return object;
  };

  Base_Helpers.configure = function(object, defaults) {
    var v;
    for (v in defaults) {
      if (typeof object[v] === "undefined" && defaults[v]) {
        object[v] = defaults[v];
      }
    }
    return object;
  };

  Base_Helpers.clone = function(obj) {
    var key, r, val;
    r = {};
    for (key in obj) {
      if (!__hasProp.call(obj, key)) continue;
      val = obj[key];
      r[key] = val;
    }
    return r;
  };

  Base_Helpers.isArray = function(source) {
    return source instanceof Array;
  };

  Base_Helpers.isObject = function(source) {
    return source !== null && typeof source === "object";
  };

  Base_Helpers.isFunction = function(source) {
    return typeof source === "function";
  };

  Base_Helpers.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  Base_Helpers.isString = function(source) {
    return Object.prototype.toString.call(source) === '[object String]';
  };

  Base_Helpers.hasProperties = function(o) {
    var k, v;
    if (!o) {
      return false;
    }
    for (k in o) {
      if (!__hasProp.call(o, k)) continue;
      v = o[k];
      return true;
    }
    return false;
  };

  Base_Helpers.removeProperty = function(o) {
    var k, v;
    for (k in o) {
      if (!__hasProp.call(o, k)) continue;
      v = o[k];
      delete o[k];
      return k;
    }
    return null;
  };

  Base_Helpers.removePropertyValue = function(o) {
    var k, v;
    for (k in o) {
      if (!__hasProp.call(o, k)) continue;
      v = o[k];
      delete o[k];
      return [k, v];
    }
    return null;
  };

  Base_Helpers.countProperties = function(o) {
    var c, k, v;
    c = 0;
    for (k in o) {
      if (!__hasProp.call(o, k)) continue;
      v = o[k];
      c += 1;
    }
    return c;
  };

  Base_Helpers.realClone = function(source) {
    var a, d, k, o, v, _i, _len;
    o = this.isObject(source);
    a = this.isArray(source);
    if (a) {
      d = [];
      for (k = _i = 0, _len = source.length; _i < _len; k = ++_i) {
        v = source[k];
        if (typeof v !== "function") {
          d[k] = this.realClone(v);
        } else {
          d[k] = v;
        }
      }
    } else if (o) {
      d = {};
      for (k in source) {
        v = source[k];
        if (typeof v !== "function") {
          d[k] = this.realClone(v);
        } else {
          d[k] = v;
        }
      }
    } else {
      d = source;
    }
    return d;
  };

  Base_Helpers.arrayContains = function(arr, item) {
    var i, _i, _len;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      i = arr[_i];
      if (i === item) {
        return true;
      }
    }
    return false;
  };

  Base_Helpers.removeFromArray = function(arr, item) {
    var i, removed, v;
    removed = false;
    for (i in arr) {
      v = arr[i];
      if (v === item) {
        arr.splice(i, 1);
        removed = true;
      }
    }
    return removed;
  };

  Base_Helpers.arraysEqual = function(arr1, arr2) {
    var i, _i, _ref;
    if (!((arr1 != null) && (arr2 != null))) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (i = _i = 0, _ref = arr1.length - 1; _i <= _ref; i = _i += 1) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  Base_Helpers.log = function(message, arg) {
    if (typeof console !== "undefined" && console !== null) {
      return console.info(message, arg);
    }
  };

  Base_Helpers.error = function(message, arg) {
    if (typeof console !== "undefined" && console !== null) {
      return console.error(message, arg);
    }
  };

  Base_Helpers.getExtension = function(name) {
    var re;
    re = /(?:\.([^.]+))?$/;
    return re.exec(name)[1];
  };

  Base_Helpers.parseXML = function(xmlString) {
    var parser, xmlDoc;
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlString, "text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(xmlString);
    }
    return xmlDoc;
  };

  Base_Helpers.createDom = function(tagName, cl, innerHtml, container) {
    var el;
    el = document.createElement(tagName);
    if (cl != null) {
      el.className = cl;
    }
    if (innerHtml != null) {
      el.innerHTML = innerHtml;
    }
    if (container != null) {
      container.appendChild(el);
    }
    return el;
  };

  Base_Helpers.createStyledDom = function(tagName, style, innerHtml, container) {
    var el, k, v;
    el = document.createElement(tagName);
    if (style != null) {
      for (k in style) {
        if (!__hasProp.call(style, k)) continue;
        v = style[k];
        el.style[k] = v;
      }
    }
    if (innerHtml != null) {
      el.innerHTML = innerHtml;
    }
    if (container != null) {
      container.appendChild(el);
    }
    return el;
  };

  Base_Helpers.hasClass = function(el, name) {
    return (el.className.length > 0) && new RegExp("(^|\\s)" + name + "(\\s|$)").test(el.className);
  };

  Base_Helpers.addClass = function(el, name) {
    if (!Base_Helpers.hasClass(el, name)) {
      if (el.className.length === 0) {
        return el.className = name;
      } else {
        return el.className = el.className + " " + name;
      }
    }
  };

  Base_Helpers.removeClass = function(el, name) {
    var replaceFn;
    replaceFn = function(w, match) {
      if (match === name) {
        return '';
      } else {
        return w;
      }
    };
    return el.className = el.className.replace(/(\S+)\s*/g, replaceFn).replace(/(^\s+|\s+$)/, '');
  };

  Base_Helpers.setClass = function(el, name) {
    return el.className = name;
  };

  Base_Helpers.listen = function(node, event, fn) {
    if (node.addEventListener) {
      return node.addEventListener(event, fn);
    } else {
      return node.attachEvent("on" + event, fn);
    }
  };

  Base_Helpers.unlisten = function(node, event, fn) {
    if (node.removeEventListener) {
      return node.removeEventListener(event, fn);
    } else {
      return node.detachEvent("on" + event, fn);
    }
  };

  Base_Helpers.createEvent = function(type) {
    var event;
    if (document.createEvent) {
      event = document.createEvent('Event');
      event.initEvent(type, true, true);
    } else {
      event = document.createEventObject();
    }
    return event;
  };

  Base_Helpers.canvasScaling = function() {
    var r;
    r = 1;
    if (window.devicePixelRatio) {
      r = window.devicePixelRatio;
    } else if (window.screen.systemXDPI) {
      r = window.screen.systemXDPI / window.screen.logicalXDPI;
    }
    return [r, r];
  };

  Base_Helpers.elementPos = function(obj) {
    var curLeft, curTop;
    curLeft = 0;
    curTop = 0;
    while (obj.offsetParent != null) {
      curLeft += obj.offsetLeft;
      curTop += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return [curLeft, curTop];
  };

  Base_Helpers.isParentOf = function(parent, child) {
    while (child != null) {
      if (child === parent) {
        return true;
      }
      child = child.parentElement;
    }
    return false;
  };

  Base_Helpers.fadeIn = function(dom) {
    return dom.style.display = "block";
  };

  Base_Helpers.fadeOut = function(dom) {
    return dom.style.display = "none";
  };

  Base_Helpers.hide = function(dom) {
    return dom.style.display = "none";
  };

  Base_Helpers.show = function(dom) {
    return dom.style.display = "block";
  };

  Base_Helpers.wrapClass = function(base, c) {
    var o, x, y, _i, _len;
    if (!this.baseCSSClass) {
      this.baseCSSClass = "DWSL";
    }
    if (!base) {
      base = this.baseCSSClass;
    }
    if (typeof base === "object") {
      if (base.objClass) {
        base = base.objClass;
      } else {
        base = this.baseCSSClass;
      }
    }
    x = c.split(",");
    o = "";
    for (_i = 0, _len = x.length; _i < _len; _i++) {
      y = x[_i];
      if (o) {
        o += " ";
      }
      o += base + "-" + y;
    }
    return o;
  };

  Base_Helpers.getProp = function(obj, route) {
    var k, r;
    r = route.split("/");
    k = r.shift();
    if (k && typeof obj !== "undefined" && typeof obj[k] !== "undefined") {
      if (r.length === 0) {
        return obj[k];
      } else {
        return this.getProp(obj[k], r.join("/"));
      }
    } else {
      return void 0;
    }
  };

  Base_Helpers.getScroll = function() {
    var body, doc, left, top;
    doc = document.documentElement;
    body = document.body;
    left = doc && doc.scrollLeft || body && body.scrollLeft || 0;
    top = doc && doc.scrollTop || body && body.scrollTop || 0;
    return [left, top];
  };

  Base_Helpers.isWithIn = function(dot, box) {
    if (dot[0] < box[0] || dot[0] > box[2] || dot[1] < box[1] || dot[1] > box[3]) {
      return true;
    } else {
      return false;
    }
  };

  Base_Helpers.mixIn = function(target, src) {
    var k, v, _ref, _results;
    _ref = src.prototype;
    _results = [];
    for (k in _ref) {
      v = _ref[k];
      _results.push(target[k] = v);
    }
    return _results;
  };

  Base_Helpers.sign = function(x) {
    if (!x) {
      return 0;
    }
    if (x < 0) {
      return -1;
    }
    return 1;
  };

  Base_Helpers.each = function() {
    var args, k, key, method, results, v, _i, _len, _ref, _ref1;
    key = arguments[0], method = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    results = [];
    if (Base_Helpers.isArray(this[key])) {
      _ref = this[key];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (v[method] != null) {
          results.push(v[method].apply(v, args));
        } else {
          console.error(v);
          throw "Object " + v + "does not have method: " + method;
        }
      }
    } else if (Base_Helpers.isObject(this[key])) {
      _ref1 = this[key];
      for (k in _ref1) {
        v = _ref1[k];
        if (v[method] != null) {
          results.push(v[method].apply(v, args));
        } else {
          console.error(v);
          throw "Object " + v + "does not have method " + method;
        }
      }
    } else {
      console.error(key, method, args);
      throw "Called iterator each on non-object/non-array";
    }
    return results;
  };

  Base_Helpers.detectBrowser = function() {
    var m, n, tem, ua;
    n = navigator.appName;
    ua = navigator.userAgent;
    m = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (m && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) {
      m[2] = tem[1];
    }
    if (m) {
      m = [m[1], m[2]];
    } else {
      m = [n, navigator.appVersion, '-?'];
    }
    return m[0].toLowerCase();
  };

  Base_Helpers.nextIdentifier = 0;

  Base_Helpers.getIdentifier = function() {
    return Base_Helpers.nextIdentifier++;
  };

  Base_Helpers.doRequest = function(url, params, success, fail) {
    var o, p, req, _i, _len,
      _this = this;
    o = [];
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      p = params[_i];
      o.push("" + (encodeURIComponent(p[0])) + "=" + (encodeURIComponent(p[1])));
    }
    o = o.join("&");
    if (url.indexOf("?") !== -1) {
      url += "&" + o;
    } else {
      url += "?" + o;
    }
    if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200) {
            return success(req.responseText);
          } else {
            return fail();
          }
        }
      };
      req.open('GET', url, true);
      return req.send('');
    }
  };

  Base_Helpers.openUrl = function(url) {
    if (Base_Helpers.isString(url)) {
      return window.open(url);
    } else {
      return window.open(url.url, url.name, url.specs, url.replace);
    }
  };

  Base_Helpers.parseData = function(text, format, chart) {
    var data, error;
    data = null;
    if (format === "JSON") {
      if (typeof text === 'string' || text instanceof String) {
        try {
          data = JSON.parse(text);
        } catch (_error) {
          error = _error;
          chart.error("Error: failed to parse JSON response: " + error + ": " + text);
        }
      } else {
        data = text;
      }
    } else {
      chart.error("Unsupported data format: " + format);
    }
    return data;
  };

  return Base_Helpers;

})();

/*
//@ sourceMappingURL=Helpers.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Data;

Timechart_Data = (function() {
  "use strict";
  var RequestData, TimeData;

  TimeData = (function() {
    TimeData.prototype.unit = "m";

    TimeData.prototype.from = 0;

    TimeData.prototype.to = 1000;

    TimeData.prototype.values = null;

    function TimeData(unit, from, to, values) {
      this.unit = unit;
      this.from = from;
      this.to = to;
      this.values = values;
    }

    TimeData.prototype.merge = function(newData, maxCount, events, append) {
      var addAfter, addBefore, from, toAdd, v;
      if (!append && (this.from > newData.to || this.to < newData.from)) {
        this.values = newData.values;
        this.from = newData.from;
        this.to = newData.to;
        return;
      }
      if (newData.values.length > 0 && newData.from > newData.values[0][0]) {
        events.error("Data merge - oldest data before from");
      }
      if (newData.values.length > 0 && newData.to < newData.values[newData.values.length - 1][0]) {
        events.error("Data merge - newest data after to");
      }
      addBefore = 0;
      while (addBefore < this.values.length && this.values[addBefore][0] < newData.from) {
        addBefore += 1;
      }
      addAfter = this.values.length;
      while (addAfter > 0 && this.values[addAfter - 1][0] > newData.to) {
        addAfter -= 1;
      }
      v = newData.values;
      this.from = Math.min(this.from, newData.from);
      this.to = Math.max(this.to, newData.to);
      if (addBefore > 0) {
        from = Math.max(0, v.length + addBefore - maxCount);
        v = this.values.slice(from, +(addBefore - 1) + 1 || 9e9).concat(v);
        if (from > 0) {
          this.from = this.values[from - 1][0] + 1;
        }
      }
      if (addAfter < this.values.length) {
        toAdd = this.values.length - addAfter;
        toAdd = Math.min(toAdd, maxCount - v.length);
        v = v.concat(this.values.slice(addAfter, +(addAfter + toAdd) + 1 || 9e9));
        if (toAdd < this.values.length - addAfter) {
          this.to = this.values[addAfter + toAdd][0];
        }
      }
      return this.values = v;
    };

    return TimeData;

  })();

  RequestData = (function() {
    RequestData.prototype.from = null;

    RequestData.prototype.to = null;

    RequestData.prototype.time = 0;

    RequestData.prototype.unit = "y";

    RequestData.prototype.callback = null;

    function RequestData(unit, from, to, callback, time) {
      this.unit = unit;
      this.from = from;
      this.to = to;
      this.callback = callback;
      this.time = time;
      true;
    }

    return RequestData;

  })();

  Timechart_Data.prototype.chart = null;

  Timechart_Data.prototype.scene = null;

  Timechart_Data.prototype.settings = null;

  Timechart_Data.prototype.noData = false;

  Timechart_Data.prototype.dataLimitFrom = null;

  Timechart_Data.prototype.dataLimitTo = null;

  Timechart_Data.prototype.dataLimitFromUnit = null;

  Timechart_Data.prototype.dataLimitToUnit = null;

  Timechart_Data.prototype.cache = null;

  Timechart_Data.prototype.requests = {};

  function Timechart_Data(chart, settings) {
    this.chart = chart;
    this.settings = settings;
    this.scene = this.chart.scene;
    this.cache = {};
    this.requests = {};
    this.updataDataLimit(null, null, this.settings.limitStart, this.settings.limitEnd, new Base_TimeStep("ms"));
    if (this.settings.preloaded != null) {
      this.addData(new RequestData(this.settings.preloaded.unit, null, null, null, 0), this.settings.preloaded);
    }
  }

  Timechart_Data.prototype.remove = function() {
    var r, u, _ref, _results;
    _ref = this.requests;
    _results = [];
    for (u in _ref) {
      r = _ref[u];
      _results.push(r.callback = null);
    }
    return _results;
  };

  Timechart_Data.prototype.determineDataLimits = function(unit, needFrom, needTo, callback) {
    var from, fromData, step, t, to, toData,
      _this = this;
    if (unit == null) {
      unit = "y";
    }
    while (unit != null) {
      if (Base_Helpers.arrayContains(this.settings.units, unit)) {
        break;
      }
      unit = Base_TimeStep.toSmallerUnit[unit];
    }
    if (unit == null) {
      this.chart.error("Cannot load data - no suitable data unit configured");
    }
    step = new Base_TimeStep(unit, 1);
    from = null;
    to = null;
    t = step.approxTime();
    if ((this.dataLimitFromUnit != null) && this.dataLimitFromUnit.approxTime() <= t) {
      from = this.dataLimitFrom;
    }
    if ((this.dataLimitToUnit != null) && this.dataLimitToUnit.approxTime() <= step.approxTime()) {
      to = this.dataLimitTo;
    }
    if ((!needFrom || (from != null)) && (!needTo || (to != null))) {
      callback(this.dataLimitFrom, this.dataLimitTo, unit);
    }
    this.scene.setMessage(this, "Determining data bounds", 999);
    toData = function(f0, t0, from, to, unit) {
      if (!((_this.dataLimitTo != null) || !needTo)) {
        if (t0 !== to) {
          _this.scheduleDataLoading(unit, to, null, false, function(a, b, c) {
            return toData(f0, to, a, b, c);
          });
          return;
        } else {
          _this.dataLimitTo = to;
        }
      }
      return fromData(f0 + 1, f0, to, unit);
    };
    fromData = function(f0, from, to, unit) {
      if (!((_this.dataLimitFrom != null) || !needFrom)) {
        if (f0 !== from) {
          _this.scheduleDataLoading(unit, null, from, false, function(a, b, c) {
            return fromData(from, a, b, c);
          });
          return;
        } else {
          _this.dataLimitFrom = from;
        }
      }
      _this.scene.setMessage(_this, null);
      return callback(_this.dataLimitFrom, _this.dataLimitTo, unit);
    };
    return this.scheduleDataLoading(unit, null, null, false, function(a, b, c) {
      return toData(a, b - 1, a, b, c);
    });
  };

  Timechart_Data.prototype.getDataForRange = function(from, to, step, callback) {
    var data, endIndex, increasingDirection, loadFrom, loadTo, loadUnit, loadingNeeded, loadingStarted, resultFrom, resultTo, resultUnit, startIndex, _ref;
    resultUnit = step.unit;
    resultFrom = null;
    resultTo = null;
    while (resultUnit) {
      if (this.cache.hasOwnProperty(resultUnit)) {
        data = this.cache[resultUnit];
        if (data !== null && data.from < to && data.to > from) {
          resultFrom = data.from;
          resultTo = data.to;
          data = data.values;
          loadingNeeded = from < resultFrom || to > resultTo;
          break;
        }
      }
      resultUnit = Base_TimeStep.toSmallerUnit[resultUnit];
    }
    if (resultUnit === null) {
      loadingNeeded = true;
    }
    loadingStarted = false;
    if (loadingNeeded) {
      loadingNeeded &= (this.settings.dataFunction != null) || (this.settings.url != null) || (this.settings.urlByUnit != null);
      loadFrom = from;
      loadTo = to;
      if (this.dataLimitFrom != null) {
        loadFrom = Math.max(this.dataLimitFrom, loadFrom);
      }
      if (this.dataLimitTo != null) {
        loadTo = Math.min(this.dataLimitTo, loadTo);
      }
      increasingDirection = false;
      if (loadFrom >= resultFrom) {
        increasingDirection = true;
        loadFrom = Math.max(loadFrom, resultTo);
      }
      if (loadTo <= resultTo) {
        loadTo = Math.min(loadTo, resultFrom);
      }
      loadingNeeded &= loadFrom < loadTo;
      if (loadingNeeded) {
        loadUnit = step.unit;
        while (loadUnit != null) {
          if (Base_Helpers.arrayContains(this.settings.units, loadUnit) && this.cache[loadUnit] !== null) {
            loadingStarted = this.scheduleDataLoading(loadUnit, loadFrom, loadTo, increasingDirection, callback);
            break;
          }
          loadUnit = Base_TimeStep.toSmallerUnit[loadUnit];
        }
      }
    }
    if (resultUnit) {
      _ref = Timechart_Data.findSubrange(data, from, to), startIndex = _ref[0], endIndex = _ref[1];
      return {
        unit: step.unit,
        count: step.count,
        from: resultFrom,
        to: resultTo,
        values: data,
        startIndex: startIndex,
        endIndex: endIndex,
        loading: loadingStarted
      };
    } else if (loadingStarted) {
      return {
        unit: step.unit,
        count: step.count,
        from: resultFrom,
        to: resultTo,
        values: [],
        startIndex: 0,
        endIndex: 0,
        loading: true
      };
    } else {
      return {
        unit: null,
        count: null,
        from: null,
        to: null,
        values: [],
        startIndex: 0,
        endIndex: 0,
        loading: false
      };
    }
  };

  Timechart_Data.prototype.updateData = function(dataUnit, newTo, callback) {
    var requestFrom, requestTo, u;
    while (dataUnit != null) {
      if (Base_Helpers.arrayContains(this.settings.units, dataUnit)) {
        break;
      }
      dataUnit = Base_TimeStep.toSmallerUnit[dataUnit];
    }
    if (!(this.cache.hasOwnProperty(dataUnit) && !this.requests[dataUnit])) {
      return;
    }
    u = new Base_TimeStep(dataUnit, 1);
    requestTo = u.roundTimeUp(newTo);
    requestFrom = u.roundTimeDown(this.cache[dataUnit].from);
    if (requestFrom <= requestTo) {
      return this.scheduleDataLoading(dataUnit, requestFrom, requestTo, true, callback);
    }
  };

  Timechart_Data.prototype.scheduleDataLoading = function(unit, from0, to0, isIncreasing, callback) {
    /*
      callback - (from, to, unit)
    */

    var bigFrom, bigTo, biggerUnit, df, fl, from, r, response, s, succ, time, timeUnitsAsked, to, u,
      _this = this;
    time = new Date().getTime();
    if (this.requests.hasOwnProperty(unit) && (this.requests[unit] != null)) {
      r = this.requests[unit];
      if (r.time + this.settings.requestTimeout < time) {
        r.callback = null;
        this.requests[unit] = null;
      } else {
        return true;
      }
    }
    from = from0;
    to = to0;
    s = new Timechart_TimeSetup(this.chart.settings);
    u = new Base_TimeStep(unit, 1);
    if (from != null) {
      from = u.roundTimeDown(from);
    }
    if (to != null) {
      to = u.roundTimeUp(to);
    }
    if ((from != null) && (to != null)) {
      timeUnitsAsked = (to - from) / u.approxTime();
      if (timeUnitsAsked > this.settings.requestMaxUnits) {
        if (isIncreasing) {
          to = u.add(from, this.settings.requestMaxUnits);
        } else {
          from = u.sub(to, this.settings.requestMaxUnits);
        }
      }
    }
    biggerUnit = s.getBiggerDataUnit(unit);
    if (biggerUnit != null) {
      u = new Base_TimeStep(biggerUnit, 1);
      if (from != null) {
        bigFrom = u.roundTimeDown(from);
        if ((this.dataLimitFrom != null) && bigFrom <= this.dataLimitFrom) {
          from = this.dataLimitFrom;
        }
      }
      if (to != null) {
        bigTo = u.roundTimeUp(to);
        if ((this.dataLimitTo != null) && bigTo >= this.dataLimitTo) {
          to = this.dataLimitTo;
        }
      }
    }
    r = new RequestData(unit, from, to, callback, time);
    if (df = this.getDataFunction()) {
      succ = function(data) {
        return _this.dataRecievedRaw(r, data);
      };
      fl = function() {
        return _this.dataFailed(r);
      };
      this.requests[unit] = r;
      response = df(from, to, unit, succ, fl);
      this.chart.log("Data requested " + unit + ", " + from + ", " + to);
      if ((response != null) && (Base_Helpers.isObject(response) || Base_Helpers.isString(response))) {
        this.dataRecievedRaw(r, response);
      }
      return true;
    } else {
      return false;
    }
  };

  Timechart_Data.prototype.dataRecievedRaw = function(request, data) {
    this.scene.setMessage("data", null);
    this.requests[request.unit] = null;
    return this.dataArrived(request, data);
  };

  Timechart_Data.prototype.dataArrived = function(request, rawData) {
    var data;
    this.chart.log("Data arrived");
    data = Base_Helpers.parseData(rawData, this.scene.settings.data.format, this.chart);
    return this.addData(request, data);
  };

  Timechart_Data.prototype.addData = function(request, parsedData, append) {
    var data, newData;
    if (append == null) {
      append = false;
    }
    if (parsedData === null) {
      return;
    }
    if (parsedData.error) {
      if (parsedData.error === "no-unit" && request) {
        this.cache[request.unit] = null;
      }
      this.chart.error(parsedData.errormessage ? parsedData.errormessage : parsedData.error);
      return;
    }
    if (request) {
      newData = this.analyzeData(parsedData, request);
    } else {
      newData = this.analyzeDataNoRequest(parsedData);
    }
    if (request && Base_TimeStep.timeUnitDiffs[newData.unit] > Base_TimeStep.timeUnitDiffs[request.unit]) {
      this.chart.error("Incorrect data - requested unit " + request.unit + ", got bigger unit - " + newData.unit);
      this.cache[request.unit] = null;
      if (request.callback != null) {
        return request.callback(null, null, null);
      }
    } else {
      if (request && (newData.unit !== request.unit)) {
        this.cache[request.unit] = null;
      }
      if (newData.unit && (newData.from != null) && (newData.to != null)) {
        data = this.cache[newData.unit];
        if (data != null) {
          this.cache[newData.unit].merge(newData, this.settings.cacheSize, this.chart, append);
        } else {
          this.cache[newData.unit] = newData;
        }
      }
      if (request && (request.callback != null)) {
        if (request.callback != null) {
          return request.callback(newData.from, newData.to, newData.unit);
        }
      }
    }
  };

  Timechart_Data.prototype.dataFailed = function(request) {
    if (this.cache[request.unit] == null) {
      this.cache[request.unit] = null;
    }
    this.scene.setMessage("data", "Data request failed", 1000);
    this.chart.error("Failed data loading request");
    if (request.callback != null) {
      return request.callback(null, null, null);
    }
  };

  Timechart_Data.prototype.updataDataLimit = function(dataFrom, dataTo, limitFrom, limitTo, unit) {
    if ((dataFrom != null) && (this.dataLimitFrom === null || this.dataLimitFrom > dataFrom)) {
      this.dataLimitFrom = dataFrom;
      this.dataLimitFromUnit = unit;
    }
    if ((dataTo != null) && (this.dataLimitTo === null || this.dataLimitTo < dataTo)) {
      this.dataLimitTo = dataTo;
      this.dataLimitToUnit = unit;
    }
    if ((limitFrom != null) && (this.dataLimitFrom === null || this.dataLimitFrom <= limitFrom)) {
      this.dataLimitFrom = limitFrom;
      this.dataLimitFromUnit = unit;
    }
    if ((limitTo != null) && (this.dataLimitTo === null || this.dataLimitTo >= limitTo)) {
      this.dataLimitTo = limitTo;
      return this.dataLimitToUnit = unit;
    }
  };

  Timechart_Data.prototype.analyzeDataNoRequest = function(data) {
    var a, dataFrom, dataTo, from, goodValues, i, r, required, step, to, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    if ((data.data != null) && (data.values == null)) {
      data.values = data.data;
    }
    _ref = ["unit", "values"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      required = _ref[_i];
      if (!data.hasOwnProperty(required)) {
        this.chart.error("Field " + required + " not set in data");
      }
    }
    if (!(data.from != null) && (data.dataLimitFrom != null)) {
      data.from = data.dataLimitFrom;
    }
    if (!(data.to != null) && (data.dataLimitTo != null)) {
      data.to = data.dataLimitTo;
    }
    from = data.from;
    to = data.to;
    dataFrom = null;
    dataTo = null;
    if ((from != null) && (to != null) && from >= to) {
      this.chart.error("Data logic error. from >= to: " + from + ", " + to);
    }
    step = Base_TimeStep.parse(data.unit);
    if (step == null) {
      this.chart.error("Data error: unrecognized data unit: " + data.unit);
    }
    if (data.values.length > 0) {
      goodValues = [];
      _ref1 = data.values;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        v = _ref1[_j];
        if (!Base_Helpers.isArray(v)) {
          this.chart.error("Data error: value should be an array: " + v);
        } else {
          v[0] = parseFloat(v[0]);
          if (!Base_Helpers.isNumber(v[0])) {
            this.chart.error("Data error: time value not a number: " + v[0]);
          } else {
            for (i = _k = 0, _len2 = v.length; _k < _len2; i = ++_k) {
              a = v[i];
              if (a !== null) {
                v[i] = parseFloat(a);
                if (!Base_Helpers.isNumber(v[i])) {
                  this.chart.error("Data error: series value not a number or null: " + v[i]);
                  v[i] = null;
                }
              }
            }
            goodValues.push(v);
          }
        }
      }
      data.values = goodValues;
      data.values.sort(function(a, b) {
        return a[0] - b[0];
      });
      dataFrom = data.values[0][0];
      dataTo = data.values[data.values.length - 1][0];
      if (data.from && dataFrom < data.from) {
        this.chart.error("Data logic error. Data time " + dataFrom + " outside [from, to) range: " + data.from + ", " + data.to);
        data.from = dataFrom;
      }
      if (data.to && dataTo > data.to) {
        this.chart.error("Data logic error. Data time " + dataTo + " outside [from, to) range: " + data.from + ", " + data.to);
        data.to = dataTo;
      }
      if (from == null) {
        from = dataFrom;
      }
      if (to == null) {
        to = dataTo;
      }
      dataFrom = step.roundTimeDown(dataFrom);
      dataTo = step.roundTimeUp(dataTo + 1);
    } else {
      if ((data.from != null) && (data.to != null)) {
        dataFrom = data.from;
        dataTo = data.to;
      }
    }
    this.updataDataLimit(from, to, data.dataLimitFrom, data.dataLimitTo, step);
    r = new TimeData(data.unit, from, to, data.values);
    if (data.error != null) {
      r.error = data.error;
    }
    return r;
  };

  Timechart_Data.prototype.analyzeData = function(data, request) {
    var a, dataFrom, dataTo, from, goodValues, i, r, rdf, rdt, required, s, step, to, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    if ((data.data != null) && (data.values == null)) {
      data.values = data.data;
    }
    _ref = ["unit", "values"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      required = _ref[_i];
      if (!data.hasOwnProperty(required)) {
        this.chart.error("Field " + required + " not set in data");
      }
    }
    if ((request.from == null) && (data.from == null) && (data.dataLimitFrom != null)) {
      data.from = data.dataLimitFrom;
    }
    if ((request.to == null) && (data.to == null) && (data.dataLimitTo != null)) {
      data.to = data.dataLimitTo;
    }
    from = data.from;
    to = data.to;
    dataFrom = null;
    dataTo = null;
    if ((from != null) && (to != null) && from >= to) {
      this.chart.error("Data logic error. from >= to: " + from + ", " + to);
    }
    step = Base_TimeStep.parse(data.unit);
    if (step == null) {
      this.chart.error("Data error: unrecognized data unit: " + data.unit);
    }
    if (data.values.length > 0) {
      goodValues = [];
      _ref1 = data.values;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        v = _ref1[_j];
        if (!Base_Helpers.isArray(v)) {
          this.chart.error("Data error: value should be an array: " + v);
        } else {
          v[0] = parseFloat(v[0]);
          if (!Base_Helpers.isNumber(v[0])) {
            this.chart.error("Data error: time value not a number: " + v[0]);
          } else {
            for (i = _k = 0, _len2 = v.length; _k < _len2; i = ++_k) {
              a = v[i];
              if (a !== null) {
                v[i] = parseFloat(a);
                if (!Base_Helpers.isNumber(v[i])) {
                  this.chart.error("Data error: series value not a number or null: " + v[i]);
                  v[i] = null;
                }
              }
            }
            goodValues.push(v);
          }
        }
      }
      data.values = goodValues;
      data.values.sort(function(a, b) {
        return a[0] - b[0];
      });
      s = new Timechart_TimeSetup(null);
      dataFrom = data.values[0][0];
      dataTo = data.values[data.values.length - 1][0];
      if (data.from && dataFrom < data.from) {
        this.chart.error("Data logic error. Data time " + dataFrom + " outside [from, to) range: " + data.from + ", " + data.to);
        data.from = dataFrom;
      }
      if (data.to && dataTo > data.to) {
        this.chart.error("Data logic error. Data time " + dataTo + " outside [from, to) range: " + data.from + ", " + data.to);
        data.to = dataTo;
      }
      if (from == null) {
        if (request.from != null) {
          from = Math.min(request.from, dataFrom);
        } else {
          from = dataFrom;
        }
      }
      if (to == null) {
        if (request.to != null) {
          to = Math.max(request.to, dataTo);
        } else {
          to = dataTo;
        }
      }
      dataFrom = step.roundTimeDown(dataFrom);
      dataTo = step.roundTimeUp(dataTo + 1);
    } else {
      if (from == null) {
        from = request.from;
      }
      if (to == null) {
        to = request.to;
      }
      if ((data.from != null) && (data.to != null)) {
        dataFrom = data.from;
        dataTo = data.to;
      } else {
        dataFrom = request.to;
        dataTo = request.from;
        if (request.from === null && request.to === null && (from == null) && (to == null) && (data.dataLimitFrom == null) && (data.dataLimitTo == null)) {
          this.noData = true;
          data.dataLimitFrom = 0;
          data.dataLimitTo = 0;
          data.from = 0;
          data.to = 0;
        }
      }
    }
    this.updataDataLimit(from, to, data.dataLimitFrom, data.dataLimitTo, step);
    s = new Timechart_TimeSetup(this.chart.settings);
    if ((request.from != null) && (data.to != null)) {
      rdt = step.roundTimeDown(data.to);
      if (rdt <= request.from) {
        this.updataDataLimit(null, null, null, data.to, step);
      }
    }
    if ((request.to != null) && (data.from != null)) {
      rdf = step.roundTimeUp(data.from);
      if (rdf >= request.to) {
        this.updataDataLimit(null, null, data.from, null, step);
      }
    }
    if (!((data.from != null) || (data.dataLimitFrom != null))) {
      if (((this.dataLimitFrom != null) && (request.from === null || (request.from <= this.dataLimitFrom && dataFrom > this.dataLimitFrom))) || ((this.dataLimitFrom == null) && (request.from == null))) {
        this.updataDataLimit(null, null, dataFrom, null, step);
        from = dataFrom;
      }
    }
    if (!((data.to != null) || (data.dataLimitTo != null))) {
      if (((this.dataLimitTo != null) && (request.to === null || (request.to >= this.dataLimitTo && dataTo < this.dataLimitTo))) || ((this.dataLimitTo == null) && (request.to == null))) {
        this.updataDataLimit(null, null, null, dataTo, step);
        to = dataTo;
      }
    }
    r = new TimeData(data.unit, from, to, data.values);
    if (data.error != null) {
      r.error = data.error;
    }
    return r;
  };

  Timechart_Data.binSearch = function(data, timestamp) {
    /*
      Returns index of first item that is >= timestamp.
    */

    var i0, i1, ii;
    i0 = 0;
    if (!data) {
      throw "no data";
    }
    i1 = data.length - 1;
    while (i0 < i1) {
      ii = ((i1 + i0) / 2) | 0;
      if (data[ii][0] < timestamp) {
        i0 = ii + 1;
      } else if (data[ii][0] > timestamp) {
        i1 = ii;
      } else {
        while (ii > 0 && data[ii - 1][0] === timestamp) {
          ii -= 1;
        }
        return ii;
      }
    }
    if (i0 < data.length && data[i0][0] < timestamp) {
      return i0 + 1;
    } else {
      return i0;
    }
  };

  Timechart_Data.linSearchUp = function(data, start, dataIndex) {
    var i, _i, _ref, _ref1;
    for (i = _i = _ref = start + 1, _ref1 = data.length - 1; _i <= _ref1; i = _i += 1) {
      if (data[i][dataIndex] !== null) {
        return i;
      }
    }
    return -1;
  };

  Timechart_Data.linSearchDown = function(data, start, dataIndex) {
    var i, _i, _ref;
    for (i = _i = _ref = start - 1; _i >= 0; i = _i += -1) {
      if (data[i][dataIndex] !== null) {
        return i;
      }
    }
    return -1;
  };

  Timechart_Data.findSubrange = function(data, from, to) {
    var i0, i1;
    i0 = Timechart_Data.binSearch(data, from);
    i1 = Timechart_Data.binSearch(data, to);
    return [i0, i1];
  };

  Timechart_Data.prototype.getDataFunction = function() {
    var config;
    config = this.settings;
    if (config.dataFunction) {
      return config.dataFunction;
    } else if (config.url || Base_Helpers.hasProperties(config.urlByUnit)) {
      return function(from, to, step, success, fail) {
        var url;
        if (Base_Helpers.hasProperties(config.urlByUnit)) {
          url = config.urlByUnit[step];
          if (!url) {
            return "{\"error\":\"no-unit\", \"errormessage\":\"no data url for this time unit: " + step + "\"}";
          }
        } else {
          url = config.url;
        }
        return Timechart_Data.defaultDataFunction(from, to, step, success, fail, url);
      };
    } else {
      return null;
    }
  };

  Timechart_Data.defaultDataFunction = function(from, to, step, success, fail, url) {
    var params;
    if (!url) {
      throw "No data URL";
    }
    if (!step) {
      throw "No step";
    }
    params = [];
    if (from != null) {
      params.push(["from", from]);
    }
    if (to != null) {
      params.push(["to", to]);
    }
    params.push(["unit", step]);
    return Base_Helpers.doRequest(url, params, success, fail);
  };

  return Timechart_Data;

})();

/*
//@ sourceMappingURL=Data.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Scrolling;

Timechart_Scrolling = (function() {
  "use strict";
  Timechart_Scrolling.prototype.animationPriority = 1000;

  Timechart_Scrolling.prototype.chart = null;

  Timechart_Scrolling.prototype.scene = null;

  Timechart_Scrolling.prototype.events = null;

  Timechart_Scrolling.prototype.panAnimF = null;

  Timechart_Scrolling.prototype.panAnimT = null;

  Timechart_Scrolling.prototype.pointer1 = null;

  Timechart_Scrolling.prototype.pointer2 = null;

  Timechart_Scrolling.prototype.t1 = 0;

  Timechart_Scrolling.prototype.t2 = 0;

  Timechart_Scrolling.prototype.scaleOrigin = null;

  Timechart_Scrolling.prototype.lastScrollingY = 0;

  Timechart_Scrolling.prototype.scrollingActive = false;

  Timechart_Scrolling.prototype.scalingActive = false;

  Timechart_Scrolling.prototype.scrollingSpeed = null;

  Timechart_Scrolling.prototype.scrollingDuration = null;

  Timechart_Scrolling.prototype.animationUnit = null;

  Timechart_Scrolling.prototype.targetUnit = null;

  Timechart_Scrolling.prototype.dragStartFrom = null;

  Timechart_Scrolling.prototype.dragStartTo = null;

  Timechart_Scrolling.prototype.dragStartBar0 = null;

  Timechart_Scrolling.prototype.dragStartBar1 = null;

  Timechart_Scrolling.prototype.highlight = null;

  Timechart_Scrolling.prototype.hilghtRemoveWhenDone = false;

  function Timechart_Scrolling(chart) {
    this.chart = chart;
    this.scene = this.chart.scene;
    this.events = this.chart.events;
  }

  Timechart_Scrolling.prototype.doAnimations = function(event) {
    var newFrom, newTo, s, time, unit;
    time = event.time;
    if ((this.panAnimF != null) || this.panAnimT) {
      newFrom = this.scene.timeStart;
      newTo = this.scene.timeEnd;
      if (this.panAnimF != null) {
        newFrom = this.panAnimF.get(time);
        if (this.panAnimF.finished(time)) {
          this.panAnimF = null;
        }
      }
      if (this.panAnimT != null) {
        newTo = this.panAnimT.get(time);
        if (this.panAnimT.finished(time)) {
          this.panAnimT = null;
        }
      }
      s = new Timechart_TimeSetup(this.scene.settings);
      if ((this.panAnimF != null) || this.panAnimT) {
        unit = this.animationUnit != null ? this.animationUnit : s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, newFrom, newTo, this.scene);
        this.scene.setTimeRange(newFrom, newTo, unit);
        event.animating = true;
      } else {
        unit = this.targetUnit != null ? this.targetUnit : s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, newFrom, newTo, this.scene);
        this.scene.setTimeRange(newFrom, newTo, unit);
        this.stopAnimations();
        this.chart.notifyAnimationDone();
      }
      event.changes.time = true;
    }
    if ((this.panAnimF != null) || this.panAnimT) {
      event.animating = true;
    }
  };

  Timechart_Scrolling.prototype.stopAnimations = function() {
    var oldFrom, oldTo;
    oldFrom = this.panAnimF;
    oldTo = this.panAnimT;
    this.animationUnit = null;
    this.targetUnit = null;
    this.panAnimF = null;
    this.panAnimT = null;
    if (this.highlight != null) {
      if (this.hilghtRemoveWhenDone) {
        this.clearZoomHighlight();
      } else {
        this.highlight.style.fillColor = this.scene.settings.area.style.zoomHighlightInactive.fillColor;
        this.events.notifySceneChanges({
          highlight: true
        });
      }
    }
    return [oldFrom, oldTo];
  };

  Timechart_Scrolling.prototype.clearZoomHighlight = function() {
    if (this.highlight != null) {
      this.scene.removeHighlight("zoomTrace");
      this.highlight = null;
      return this.events.notifySceneChanges({
        highlight: true
      });
    }
  };

  Timechart_Scrolling.prototype.setZoomHighlight = function(from, to, removeWhenDone) {
    this.highlight = this.scene.setHighlight("zoomTrace", from, to, this.scene.settings.area.style.zoomHighlight);
    this.hilghtRemoveWhenDone = removeWhenDone;
    return this.events.notifySceneChanges({
      highlight: true
    });
  };

  Timechart_Scrolling.prototype.pointerInScrollArea = function(event) {
    return this.scene.xyInChartOrTime(event.x, event.y);
  };

  Timechart_Scrolling.prototype.getFrom = function() {
    if (this.panAnimF != null) {
      return this.panAnimF.to;
    } else {
      return this.scene.timeStart;
    }
  };

  Timechart_Scrolling.prototype.getTo = function() {
    if (this.panAnimT != null) {
      return this.panAnimT.to;
    } else {
      return this.scene.timeEnd;
    }
  };

  Timechart_Scrolling.prototype.onWheel = function(event) {
    var ds, from, notify, origin, to, _ref;
    if (!this.scene.displayUnit || !this.pointerInScrollArea(event) || (!this.scene.settings.interaction.zooming.wheel) || (!this.scene.settings.interaction.zooming.enabled)) {
      return;
    }
    origin = this.scaleOrigin != null ? this.scaleOrigin : this.scene.xToTime(event.x);
    ds = Math.pow(1 + this.scene.settings.interaction.zooming.sensitivity, event.wheely * 0.004);
    from = this.getFrom();
    to = this.getTo();
    from = (from - origin) * ds + origin;
    to = (to - origin) * ds + origin;
    if (this.scene.settings.interaction.scrolling.noData != null) {
      _ref = this._preventOverscale(from, to, origin), from = _ref[0], to = _ref[1];
    }
    notify = this.pointer1 != null ? null : "user";
    this.setTimeRange(from, to, null, true, notify);
    if (this.pointer1 != null) {
      this.scalingActive = true;
    }
    return event.consumed = true;
  };

  Timechart_Scrolling.prototype.onPointerDown = function(event) {
    var _ref;
    if (!this.scene.displayUnit || !this.pointerInScrollArea(event) || (!this.scene.settings.interaction.scrolling.enabled && !this.scene.settings.interaction.zooming.enabled)) {
      return;
    }
    if (this.pointer1 === null) {
      this.chart.cancelTimeChangeNotify();
      this.pointer1 = event.identifier;
      this.t1 = this.scene.xToTime(event.x);
      this.scaleOrigin = this.t1;
      this.dragStartFrom = this.panAnimF != null ? this.panAnimF.to : this.scene.timeStart;
      this.dragStartTo = this.panAnimT != null ? this.panAnimT.to : this.scene.timeEnd;
      _ref = this.scene.getClickRange(this.t1, null), this.dragStartBar0 = _ref[0], this.dragStartBar1 = _ref[1];
      this.lastScrollingY = event.y;
      this.scalingActive = false;
      this.scrollingActive = false;
      event.consumed = true;
      if ((this.panAnimF != null) || (this.panAnimT != null)) {
        this.stopAnimations();
        this.scrollingActive = true;
      }
      return this.scene.anchor = null;
    } else if (this.pointer2 === null) {
      this.pointer2 = event.identifier;
      this.t2 = this.scene.xToTime(event.x);
      this.scaleOrigin = (this.t1 + this.t2) / 2;
      return event.consumed = true;
    }
  };

  Timechart_Scrolling.prototype.onPointerDrag = function(event) {
    var bar, ds, dt, from, time, to, _ref, _ref1, _ref2, _ref3;
    time = this.scene.xToTime(event.x);
    if (event.identifier === this.pointer1 && (this.pointer2 == null)) {
      this.scaleOrigin = this.t1;
      if (Math.abs(event.dx) > Math.abs(event.dy)) {
        this.lastScrollingY = event.y;
      } else if (this.scene.settings.interaction.zooming.enabled && this.scene.settings.interaction.zooming.swipe && Math.abs(this.lastScrollingY - event.y) > this.scene.settings.interaction.zooming.upDownTreshold) {
        this.scalingActive = true;
      }
      from = this.getFrom();
      to = this.getTo();
      if (this.scalingActive) {
        this.clearZoomHighlight();
        ds = Math.pow(1 + this.scene.settings.interaction.zooming.sensitivity, -event.dy / this.scene.height);
        from = (from - this.scaleOrigin) * ds + this.scaleOrigin;
        to = (to - this.scaleOrigin) * ds + this.scaleOrigin;
      }
      if (this.scene.settings.interaction.scrolling.enabled) {
        this.scrollingActive = true;
        dt = this.t1 - time;
        from = from + dt;
        to = to + dt;
      }
      if (this.scene.settings.interaction.scrolling.noData === "block") {
        if (this.scalingActive) {
          _ref = this._preventOverscale(from, to, this.scaleOrigin), from = _ref[0], to = _ref[1];
        }
        _ref1 = this._preventOverscroll(from, to), from = _ref1[0], to = _ref1[1];
      }
      bar = this.scalingActive ? null : this.scene.displayUnit;
      this.setTimeRange(from, to, bar, false, false);
      return event.consumed = true;
    } else if (event.identifier === this.pointer1 && this.scene.settings.interaction.scrolling.enabled) {
      this.clearZoomHighlight();
      _ref2 = this.twoPointerDrag(time, this.t2, this.scene.timeStart, this.scene.timeEnd), from = _ref2[0], to = _ref2[1];
      this.setTimeRange(from, to, this.scene.displayUnit, false, false);
      return event.consumed = true;
    } else if (event.identifier === this.pointer2 && this.scene.settings.interaction.scrolling.enabled) {
      this.clearZoomHighlight();
      _ref3 = this.twoPointerDrag(this.t1, time, this.scene.timeStart, this.scene.timeEnd), from = _ref3[0], to = _ref3[1];
      this.setTimeRange(from, to, null, false, false);
      return event.consumed = true;
    }
  };

  Timechart_Scrolling.prototype.twoPointerDrag = function(time1, time2, from, to) {
    var Fx, Tx, dt, from1, fromExtended, ratio, ta, tb, toExtended, _ref, _ref1;
    this.scaleOrigin = (time1 + time2) / 2;
    if (this.scene.settings.interaction.scrolling.enabled && this.scene.settings.interaction.zooming.enabled && this.scene.settings.interaction.zooming.fingers) {
      Fx = (from - this.t1) / (this.t2 - this.t1);
      Tx = (to - this.t1) / (this.t2 - this.t1);
      fromExtended = time1 + (time2 - time1) * Fx;
      toExtended = time1 + (time2 - time1) * Tx;
      ratio = (to - from) / (toExtended - fromExtended);
      from1 = (from - fromExtended) * ratio + from;
      to = (to - fromExtended) * ratio + from;
      from = from1;
      this.scalingActive = true;
      this.scrollingActive = true;
    } else if (this.scene.settings.interaction.scrolling.enabled) {
      ta = (this.t1 + this.t2) / 2;
      tb = (time1 + time2) / 2;
      dt = ta - tb;
      from += dt;
      to += dt;
      this.scrollingActive = true;
    }
    if (this.scene.settings.interaction.scrolling.noData === "block") {
      _ref = this._preventOverscale(from, to, this.scaleOrigin), from = _ref[0], to = _ref[1];
      _ref1 = this._preventOverscroll(from, to), from = _ref1[0], to = _ref1[1];
    }
    return [from, to];
  };

  Timechart_Scrolling.prototype.onPointerUp = function(event) {
    var direction, dt, dur, from, outUnit, s, speed, to, unit, vx, _ref, _ref1, _ref2;
    if (event.identifier === this.pointer2) {
      this.pointer2 = null;
      event.consumed = true;
      return this.scaleOrigin = this.t1;
    } else if (event.identifier === this.pointer1 && (this.pointer2 != null)) {
      this.pointer1 = this.pointer2;
      this.pointer2 = null;
      this.t1 = this.t2;
      this.scaleOrigin = this.t1;
      return event.consumed = true;
    } else if (event.identifier === this.pointer1) {
      this.pointer1 = null;
      outUnit = new Timechart_TimeSetup(this.scene.settings).getBiggerDisplayPeriod(this.dragStartFrom, this.dragStartTo);
      if ((outUnit != null) && this.scene.settings.interaction.scrolling.swipePageFlipping && event.swipeUp && this.scalingActive && event.swipeSpeed > this.scene.height / this.scene.settings.interaction.swipeSensitivity) {
        this.zoomOut(outUnit.displayPeriod, this.dragStartFrom, this.dragStartTo, outUnit.displayUnit, true, "user");
      } else if (this.scene.settings.interaction.scrolling.swipePageFlipping && event.swipeDown && this.scalingActive && event.swipeSpeed > this.scene.height / this.scene.settings.interaction.swipeSensitivity) {
        if (this.dragStartBar1 - this.dragStartBar0 > this.scene.timeEnd - this.scene.timeStart) {
          _ref = this.scene.getClickBar(this.scaleOrigin), from = _ref[0], to = _ref[1];
        } else {
          from = this.dragStartBar0;
          to = this.dragStartBar1;
        }
        this.setTimeRangeSnap(from, to, this.scaleOrigin, null, true, "user", this.scrollingActive, this.scalingActive);
      } else if (this.scrollingActive || this.scalingActive) {
        from = this.scene.timeStart;
        to = this.scene.timeEnd;
        if (this.scrollingActive) {
          vx = -event.vx;
          if (vx > 0) {
            vx = Math.min(vx, this.scene.width * 2);
          } else {
            vx = Math.max(vx, -this.scene.width * 2);
          }
          speed = this.scene.dxToDtime(vx);
          dur = Math.abs(event.vx / this.scene.width) / this.scene.settings.advanced.scrollingFriction;
          dur = Math.min(dur, 1);
          dt = dur * speed / 2;
          if (Math.abs(dt) > this.scene.displayUnit.approxTime()) {
            this.scrollingSpeed = speed;
            this.scrollingDuration = dur * 1000;
            from += dt;
            to += dt;
          }
        }
        if (this.scene.settings.interaction.scrolling.swipePageFlipping && event.swipeLeft || event.swipeRight && event.swipeSpeed > this.scene.width / this.scene.settings.interaction.swipeSensitivity * 0.7) {
          s = new Timechart_TimeSetup(this.scene.settings);
          direction = event.swipeLeft ? "<" : ">";
          _ref1 = s.scroll(this.dragStartFrom, this.dragStartTo, this.scene.displayUnit, direction, 1, "page"), from = _ref1[0], to = _ref1[1];
          _ref2 = this._preventOverscroll(from, to, this.scene.displayUnit), from = _ref2[0], to = _ref2[1];
          this.setTimeRange(from, to, this.scene.displayUnit, true, "user");
        } else {
          unit = this.scalingActive ? null : this.scene.displayUnit;
          this.setTimeRangeSnap(from, to, this.scaleOrigin, unit, true, "user", this.scrollingActive, this.scalingActive);
        }
      }
      event.consumed = true;
      this.scaleOrigin = null;
      this.dragStartBar0 = null;
      this.dragStartBar1 = null;
      this.dragStartFrom = null;
      return this.dragStartTo = null;
    }
  };

  Timechart_Scrolling.prototype.onKeyDown = function(event) {
    var c, direction, from, s, to, zoom, _ref, _ref1;
    if (!this.scene.displayUnit) {
      return;
    }
    from = this.getFrom();
    to = this.getTo();
    if (event.keyCode === 37) {
      direction = "<";
      event.consumed = true;
    } else if (event.keyCode === 39) {
      direction = ">";
      event.consumed = true;
    } else if (event.keyCode === 36) {
      this.goHome(to - from, true, "user");
      event.consumed = true;
      return;
    } else if (event.keyCode === 38) {
      zoom = this.scene.settings.interaction.zooming.keyboardFactor;
      event.consumed = true;
    } else if (event.keyCode === 40) {
      zoom = 1 / this.scene.settings.interaction.zooming.keyboardFactor;
      event.consumed = true;
    }
    if (zoom != null) {
      c = (from + to) / 2;
      from = c - (c - from) * zoom;
      to = c + (to - c) * zoom;
      this.setTimeRangeSnap(from, to, c, null, true, "user", false, true);
    }
    if (direction != null) {
      s = new Timechart_TimeSetup(this.scene.settings);
      _ref = s.scroll(this.getFrom(), this.getTo(), this.scene.displayUnit, direction, this.scene.settings.interaction.scrolling.keyboardScrollingFactor, "page"), from = _ref[0], to = _ref[1];
      _ref1 = this._preventOverscroll(from, to, this.scene.displayUnit), from = _ref1[0], to = _ref1[1];
      return this.setTimeRange(from, to, this.scene.displayUnit, true, "user");
    }
  };

  Timechart_Scrolling.prototype.goHome = function(dt, animate, notifyOrigin) {
    var dataFrom, dataTo, _ref;
    _ref = this.scene.getDataPeriod(false), dataFrom = _ref[0], dataTo = _ref[1];
    if (dataTo === null) {
      return;
    }
    return this.setTimeRangeSnap(dataTo - dt, dataTo, dataTo - dt, this.scene.displayUnit, animate, notifyOrigin, true, false);
  };

  Timechart_Scrolling.prototype.setTimeRangeSnap = function(from, to, origin, desiredUnit, animate, notifyOrigin, scroll, scale) {
    /*
      Takes the time range and applies snapping rules from settings.
    */

    var dataFrom, dataTo, from0, fromD, fromU, numberOfBars, oldFrom, oldTo, period, pfrom, pto, pu, r, range, s, snapUnit, sp, to0, unit, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
    unit = desiredUnit;
    s = new Timechart_TimeSetup(this.scene.settings);
    if (this.scene.settings.interaction.scrolling.noData != null) {
      if (scale) {
        _ref = this._preventOverscale(from, to, origin), from = _ref[0], to = _ref[1];
      }
      if (unit == null) {
        unit = s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, from, to, this.scene);
      }
      if (scroll) {
        _ref1 = this._preventOverscroll(from, to, unit), from = _ref1[0], to = _ref1[1];
      }
    } else {
      oldFrom = this.dragStartFrom != null ? this.dragStartFrom : this.scene.timeStart;
      oldTo = this.dragStartTo != null ? this.dragStartTo : this.scene.timeEnd;
      if (unit == null) {
        unit = s.computeDisplayUnit(oldFrom, oldTo, this.scene.displayUnit, from, to, this.scene);
      }
    }
    from0 = from;
    to0 = to;
    if (this.scene.settings.interaction.snapMode != null) {
      if (this.scene.settings.interaction.snapMode === "displayUnit") {
        snapUnit = unit;
      } else if (this.scene.settings.interaction.snapMode === "multiperiod" || this.scene.settings.interaction.snapMode === "period") {
        range = to - from;
        _ref2 = r = this.scene.getDataPeriod(), dataFrom = _ref2[0], dataTo = _ref2[1];
        if (dataFrom != null) {
          range = Math.min(range, dataTo - dataFrom);
        }
        sp = s.getClosestDisplayPeriod(range, this.scene.majorTimeUnit, this.scene.settings.interaction.snapMode === "multiperiod");
        unit = sp.displayUnit != null ? sp.displayUnit : desiredUnit;
        snapUnit = sp.displayPeriod;
        this.scene.period = sp.displayPeriod;
        this.scene.anchor = sp.displayAnchor;
      }
      if (this.scene.settings.interaction.snapMode != null) {
        if (this.scene.settings.interaction.snapMode === "period") {
          from = snapUnit.roundTimeDown(origin);
          to = snapUnit.add(from, 1);
        } else {
          numberOfBars = Math.max(snapUnit.numberOfUnits(from, to), 1);
          fromD = snapUnit.roundTimeDown(from);
          fromU = snapUnit.roundTimeUp(from);
          if (from - fromD < fromU - from) {
            from = snapUnit.roundTimeDown(from);
          } else {
            from = snapUnit.roundTimeUp(from);
          }
          to = snapUnit.add(from, numberOfBars);
        }
        _ref3 = this.scene.settings.toolbars.advanced.periods;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          period = _ref3[_i];
          _ref4 = this.computeDisplayPeriod(period.displayPeriod, period.displayAnchor, null, this.scene.data.dataLimitFrom, this.scene.data.dataLimitTo), pfrom = _ref4[0], pto = _ref4[1], pu = _ref4[2];
          if ((pfrom != null) && (pto != null) && Math.abs(pfrom - from0) + Math.abs(pto - to0) < Math.abs(from - from0) + Math.abs(to - to0)) {
            from = pfrom;
            to = pto;
            unit = pu;
            this.scene.period = period.displayPeriod;
            this.scene.anchor = period.displayAnchor;
          }
        }
      } else {
        from = Math.round(from);
        to = Math.round(to);
      }
    }
    return this.setTimeRange(from, to, unit, animate, notifyOrigin);
  };

  Timechart_Scrolling.prototype.computeDisplayPeriod = function(period, anchor, unitStr, dataFrom, dataTo) {
    var from, s, to, unit, _ref;
    s = new Timechart_TimeSetup(this.scene.settings);
    _ref = s.tryComputeDisplayPeriod(period, anchor, unitStr, dataFrom, dataTo, this.scene, this.scene.getNow()), from = _ref[0], to = _ref[1], unit = _ref[2];
    if (from === null || to === null) {
      return [null, null, null];
    }
    return this.computeTimeRangeExtend(from, to, unit);
  };

  Timechart_Scrolling.prototype.computeTimeRangeExtend = function(from, to, unit) {
    /*
      For scaling - snaps both ends to full/partial block
    */

    var s, _ref;
    s = new Timechart_TimeSetup(this.scene.settings);
    if (unit == null) {
      unit = s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, from, to, this.scene);
    }
    if (this.scene.settings.advanced.includePartialUnits) {
      from = unit.roundTimeDown(from);
      to = unit.roundTimeUp(to);
    } else {
      from = unit.roundTimeUp(from);
      to = unit.roundTimeDown(to);
    }
    if (to === from) {
      to = unit.add(to, 1);
    }
    if (this.scene.settings.interaction.scrolling.noData != null) {
      _ref = this._preventOverscroll(from, to, unit), from = _ref[0], to = _ref[1];
    }
    return [from, to, unit];
  };

  /*
    Just sets the specified time range (with optional animation).
  */


  Timechart_Scrolling.prototype.setTimeRange = function(from, to, unit, animate, notifyOrigin) {
    var diff, f, oldFromAnim, oldToAnim, s, t, _ref;
    if (!(from < to || unit)) {
      return;
    }
    if (!this.scene.timeStart && !this.scene.timeEnd) {
      animate = false;
    }
    from = Math.round(from);
    to = Math.round(to);
    _ref = this.stopAnimations(), oldFromAnim = _ref[0], oldToAnim = _ref[1];
    s = new Timechart_TimeSetup(this.scene.settings);
    if ((unit == null) && from < to) {
      unit = s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, from, to, this.scene);
    }
    if (animate) {
      if (this.scrollingSpeed != null) {
        this.panAnimF = new Base_Animator(this.scene.timeStart, from, this.scrollingDuration, "scroll");
        this.panAnimT = new Base_Animator(this.scene.timeEnd, to, this.scrollingDuration, "scroll");
        this.scrollingSpeed = null;
      } else if (oldFromAnim || oldToAnim) {
        this.panAnimF = oldFromAnim.retarget(from);
        this.panAnimT = oldToAnim.retarget(to);
      } else {
        this.panAnimF = new Base_Animator(this.scene.timeStart, from, this.scene.settings.interaction.animationDelay, "<>");
        this.panAnimT = new Base_Animator(this.scene.timeEnd, to, this.scene.settings.interaction.animationDelay, "<>");
      }
      diff = Math.abs((from - to) / (this.scene.timeStart - this.scene.timeEnd + 1));
      if (diff < 1 / this.scene.settings.advanced.zoomHighlightThreshold) {
        this.setZoomHighlight(from, to, true);
      } else if (diff > this.scene.settings.advanced.zoomHighlightThreshold) {
        f = this.dragStartFrom != null ? this.dragStartFrom : this.scene.timeStart;
        t = this.dragStartTo != null ? this.dragStartTo : this.scene.timeEnd;
        this.setZoomHighlight(f, t, false);
      }
      this.targetUnit = unit;
      this.animationUnit = (unit == null) || (this.scene.displayUnit && unit.toString() !== this.scene.displayUnit.toString()) ? null : unit;
    } else {
      this.targetUnit = null;
      this.scene.setTimeRange(from, to, unit);
    }
    this.events.notifySceneChanges({
      time: true
    });
    if (notifyOrigin) {
      return this.chart.notifyTimeChanged(from, to, unit, notifyOrigin);
    }
  };

  Timechart_Scrolling.prototype.zoomOut = function(unit, from, to, displayUnit, animate, notifyOrigin) {
    var dataDiff, dataFrom, dataTo, form, p, period, s, sceneDiff, targetDiff, zoomToData, _ref, _ref1, _ref2;
    s = new Timechart_TimeSetup(this.scene.settings);
    if (unit == null) {
      p = s.getBiggerDisplayPeriod(this.scene.timeStart, this.scene.timeEnd);
      if (p != null) {
        unit = p.displayPeriod;
        if (p.displayUnit == null) {
          displayUnit = p.displayUnit;
        }
      }
    }
    if (unit == null) {
      return;
    }
    from = unit.roundTimeDown(from);
    to = unit.roundTimeUp(to);
    _ref = this._preventOverscale(from, to, (from + to) / 2), form = _ref[0], to = _ref[1];
    _ref1 = this.scene.getDataPeriod(unit), dataFrom = _ref1[0], dataTo = _ref1[1];
    zoomToData = false;
    if ((dataFrom != null) && (dataTo != null)) {
      period = s.getClosestDisplayPeriod(dataTo - dataFrom);
      dataFrom = period.displayPeriod.roundTimeDown(dataFrom);
      dataTo = period.displayPeriod.roundTimeUp(dataTo);
      dataDiff = dataTo - dataFrom;
      sceneDiff = this.scene.timeEnd - this.scene.timeStart;
      targetDiff = to - from;
      zoomToData = targetDiff >= dataDiff && sceneDiff < dataDiff;
    }
    if (zoomToData) {
      from = dataFrom;
      to = dataTo;
    }
    if (displayUnit == null) {
      displayUnit = s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, from, to, this.scene);
    }
    if (!(this.scene.settings.interaction.snapMode === "period" || this.scene.settings.interaction.snapMode === "multiperiod")) {
      _ref2 = this._snapToAnchor(from, to, displayUnit), from = _ref2[0], to = _ref2[1];
    }
    return this.setTimeRange(from, to, displayUnit, animate, notifyOrigin);
  };

  Timechart_Scrolling.prototype._snapToAnchor = function(from, to, unit) {
    var direction, dt, s, time;
    s = new Timechart_TimeSetup(this.scene.settings);
    if (this.scene.anchor === "now") {
      time = this.scene.getCurTime();
      direction = -1;
    } else if (this.scene.anchor === "newestData") {
      time = this.scene.data.dataLimitTo;
      direction = -1;
    }
    if ((time != null) && direction === -1 && to > time) {
      dt = time - to;
      to = unit.roundTimeUp(to + dt);
      from = unit.roundTimeUp(from + dt);
    }
    return [from, to];
  };

  Timechart_Scrolling.prototype._preventOverscroll = function(from, to, unit) {
    var dataFrom, dataTo, _ref;
    if (unit == null) {
      unit = this.scene.displayUnit;
    }
    _ref = this.scene.getDataPeriod(unit), dataFrom = _ref[0], dataTo = _ref[1];
    if (!((dataFrom != null) && (dataTo != null))) {
      return [from, to];
    }
    return new Timechart_TimeSetup(this.scene.settings).preventOverscroll(unit, from, to, dataFrom, dataTo);
  };

  Timechart_Scrolling.prototype._preventOverscale = function(from, to, center) {
    var dataFrom, dataTo, df, dt, s, units, _ref;
    s = new Timechart_TimeSetup(this.scene.settings);
    _ref = this.scene.getDataPeriod(), dataFrom = _ref[0], dataTo = _ref[1];
    df = -Infinity;
    dt = Infinity;
    if ((dataFrom != null) && (dataTo != null)) {
      df = dataFrom;
      dt = dataTo;
    }
    units = this.scene.settings.area.displayUnitsParsed;
    return s.preventOverscale(this.scene, units, center, from, to, df, dt);
  };

  return Timechart_Scrolling;

})();

/*
//@ sourceMappingURL=Scrolling.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Layers;

Timechart_Layers = (function() {
  Timechart_Layers.prototype.chart = null;

  Timechart_Layers.prototype.scene = null;

  Timechart_Layers.prototype.container = null;

  Timechart_Layers.prototype.background = null;

  Timechart_Layers.prototype.canvas = null;

  Timechart_Layers.prototype.valueAxisPanel = null;

  Timechart_Layers.prototype.timeAxisPanel = null;

  Timechart_Layers.prototype.outerBorder = null;

  Timechart_Layers.prototype.mouseTrackLayer = null;

  Timechart_Layers.prototype.curTheme = null;

  function Timechart_Layers(chart) {
    this.chart = chart;
    this.scene = this.chart.scene;
    this.container = Base_Helpers.createDom("div", "TimeChart-container");
    this.container.style.position = "relative";
    this.container.style.width = "100%";
    this.container.style.height = "300px";
    this.background = Base_Helpers.createDom("div", "TimeChart-background", null, this.container);
    this.setContainerStyle(this.background);
    this.timeAxisPanel = Base_Helpers.createDom("div", "TimeChart-timeAxis", null, this.container);
    this.setContainerStyle(this.timeAxisPanel);
    this.canvas = Base_Helpers.createDom("canvas", "TimeChart-barCanvas", null, this.container);
    this.setContainerStyle(this.canvas);
    if (Base_Helpers.getProp(this.scene, "settings/valueAxis/default")) {
      this.valueAxisPanel = Base_Helpers.createDom("div", "TimeChart-valueAxis", null, this.container);
      this.setContainerStyle(this.valueAxisPanel);
    }
    if (Base_Helpers.getProp(this.scene, "settings/valueAxis/secondary")) {
      this.secondaryValueAxisPanel = Base_Helpers.createDom("div", "TimeChart-valueAxis", null, this.container);
      this.setContainerStyle(this.secondaryValueAxisPanel);
    }
    this.resizerBar = Base_Helpers.createDom("div", "TimeChart-resizer", null, this.container);
    this.outerBorder = Base_Helpers.createDom("div", "TimeChart-border", null, this.container);
    this.setContainerStyle(this.outerBorder);
    this.mouseTrackLayer = Base_Helpers.createDom("div", null, null, this.container);
    this.mouseTrackLayer.tabIndex = 0;
    this.mouseTrackLayer.style.outline = "none";
    this.setContainerStyle(this.mouseTrackLayer);
    this.updateSettings(this.scene.settings, "init");
    this.updateSize();
  }

  Timechart_Layers.prototype.updateSize = function() {
    if (this.scene.settings.width != null) {
      this.container.style.width = "" + this.scene.settings.width + "px";
    }
    if (this.scene.settings.height != null) {
      this.container.style.height = "" + this.scene.settings.height + "px";
    }
    this.background.style.left = "" + this.scene.x0 + "px";
    this.background.style.width = "" + this.scene.width + "px";
    if (Base_Helpers.getProp(this.scene, "settings/valueAxis/default")) {
      this.valueAxisPanel.style.width = "" + this.scene.leftValueAxisSize + "px";
      this.valueAxisPanel.style.bottom = "" + this.scene.timeAxisSize + "px";
    }
    if (Base_Helpers.getProp(this.scene, "settings/valueAxis/secondary")) {
      this.secondaryValueAxisPanel.style.width = "" + this.scene.leftValueAxisSize + "px";
      this.secondaryValueAxisPanel.style.bottom = "" + this.scene.timeAxisSize + "px";
    }
    this.timeAxisPanel.style.top = "" + (this.scene.height + this.scene.toolbarHeight) + "px";
    this.timeAxisPanel.style.left = "" + this.scene.x0 + "px";
    this.timeAxisPanel.style.width = "" + this.scene.width + "px";
    this.outerBorder.style.left = "" + this.scene.x0 + "px";
    this.outerBorder.style.width = "" + this.scene.width + "px";
    this.resizerBar.style.width = "" + this.scene.width + "px";
    return this.resizerBar.style.left = "" + this.scene.x0 + "px";
  };

  Timechart_Layers.prototype.updateSettings = function(changes) {
    if (Base_Helpers.getProp(changes, "advanced/themeCSSClass") != null) {
      if (this.curTheme != null) {
        Base_Helpers.removeClass(this.container, this.curTheme);
      }
      this.curTheme = this.scene.settings.advanced.themeCSSClass;
      Base_Helpers.addClass(this.container, this.curTheme);
      /*if Base_Helpers.getProp(changes, "valueAxis/default/position")?
      # TODO - this is now different, axis can be both inside and outside
      if @scene.settings.valueAxis.default.position == "outside"
        Base_Helpers.removeClass(@container, "TC-valueAxisInside")
        Base_Helpers.addClass(@container, "TC-valueAxisOutside")
      else
        Base_Helpers.removeClass(@container, "TC-valueAxisOutside")
        Base_Helpers.addClass(@container, "TC-valueAxisInside")
      
          if Base_Helpers.getProp(changes, "valueAxis/secondary/position")?
      if @scene.settings.valueAxis.secondary.position == "outside"
        Base_Helpers.removeClass(@container, "TC-secondaryValueAxisInside")
        Base_Helpers.addClass(@container, "TC-secondaryValueAxisOutside")
      else
        Base_Helpers.removeClass(@container, "TC-secondaryValueAxisOutside")
        Base_Helpers.addClass(@container, "TC-secondaryValueAxisInside")
      */

    }
    if ((changes.width != null) || (changes.height != null)) {
      return this.updateSize();
    }
  };

  Timechart_Layers.prototype.setContainerStyle = function(c) {
    c.style.position = "absolute";
    c.style.left = "0px";
    c.style.right = "0px";
    c.style.top = "0px";
    return c.style.bottom = "0px";
  };

  return Timechart_Layers;

})();

/*
//@ sourceMappingURL=Layers.map
*/

// Generated by CoffeeScript 1.6.3
/*
  Represents a single pointer. On multitouch, separate event for each pointer will be fired.
*/

var Base_MouseEvent, Base_MouseEvents,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty;

Base_MouseEvent = (function() {
  Base_MouseEvent.prototype.time = 0;

  Base_MouseEvent.prototype.changes = {};

  Base_MouseEvent.prototype.x = 0;

  Base_MouseEvent.prototype.y = 0;

  Base_MouseEvent.prototype.dx = 0;

  Base_MouseEvent.prototype.dy = 0;

  Base_MouseEvent.prototype.vx = 0;

  Base_MouseEvent.prototype.vy = 0;

  Base_MouseEvent.prototype.wheely = 0;

  Base_MouseEvent.prototype.wheelx = 0;

  Base_MouseEvent.prototype.identifier = 0;

  Base_MouseEvent.prototype.pressed = false;

  Base_MouseEvent.prototype.consumed = false;

  Base_MouseEvent.prototype.touch = false;

  Base_MouseEvent.prototype.swipeUp = false;

  Base_MouseEvent.prototype.swipeDown = false;

  Base_MouseEvent.prototype.swipeLeft = false;

  Base_MouseEvent.prototype.swipeRight = false;

  function Base_MouseEvent(x, y, time, identifier) {
    this.x = x;
    this.y = y;
    this.time = time;
    this.identifier = identifier;
    1;
  }

  Base_MouseEvent.prototype.distance = function(p) {
    return Math.sqrt((p.x - this.x) * (p.x - this.x) + (p.y - this.y) * (p.y - this.y));
  };

  return Base_MouseEvent;

})();

Base_MouseEvents = (function() {
  "use strict";
  Base_MouseEvents.prototype.ID_MOUSE = "mouse";

  Base_MouseEvents.prototype.EVENT_MOVE = "move";

  Base_MouseEvents.prototype.EVENT_DOWN = "down";

  Base_MouseEvents.prototype.EVENT_DRAG = "drag";

  Base_MouseEvents.prototype.EVENT_UP = "up";

  Base_MouseEvents.prototype.EVENT_LEAVE = "leave";

  Base_MouseEvents.prototype.EVENT_CLICK = "click";

  Base_MouseEvents.prototype.EVENT_DBLCLICK = "dblclick";

  Base_MouseEvents.prototype.EVENT_WHEEL = "mwheel";

  Base_MouseEvents.prototype.scaleX = 1.0;

  Base_MouseEvents.prototype.scaleY = 1.0;

  Base_MouseEvents.prototype.hasTouch = false;

  Base_MouseEvents.prototype.mm = 1;

  Base_MouseEvents.prototype.clickEvent = null;

  Base_MouseEvents.prototype.cachedContainerPosition = null;

  function Base_MouseEvents(container, settings) {
    this.container = container;
    this.settings = settings;
    this.handleTouchMove = __bind(this.handleTouchMove, this);
    this.handleTouchEnd = __bind(this.handleTouchEnd, this);
    this.handleTouchStart = __bind(this.handleTouchStart, this);
    this.handleMouseMove = __bind(this.handleMouseMove, this);
    this.handleMouseUp = __bind(this.handleMouseUp, this);
    this.handleMouseWheel = __bind(this.handleMouseWheel, this);
    this.handleMouseDown = __bind(this.handleMouseDown, this);
    this.updateContainerPosition = __bind(this.updateContainerPosition, this);
    this.listeners = {};
    this.downPointers = {};
    this.inPointers = {};
    this.whiteList = [this.container];
    Base_Helpers.listen(this.container, "mousedown", this.handleMouseDown);
    Base_Helpers.listen(this.container, "mousewheel", this.handleMouseWheel);
    Base_Helpers.listen(this.container, "DOMMouseScroll", this.handleMouseWheel);
    Base_Helpers.listen(this.container, "touchstart", this.handleTouchStart);
    Base_Helpers.listen(window, "mouseup", this.handleMouseUp);
    Base_Helpers.listen(window, "mousemove", this.handleMouseMove);
    Base_Helpers.listen(window, "touchend", this.handleTouchEnd);
    Base_Helpers.listen(window, "touchcancel", this.handleTouchEnd);
    Base_Helpers.listen(window, "touchmove", this.handleTouchMove);
    Base_Helpers.listen(window, "resize", this.updateContainerPosition);
  }

  Base_MouseEvents.prototype.addWhiteList = function(item) {
    this.whiteList.push(item);
    Base_Helpers.listen(item, "mousedown", this.handleMouseDown);
    Base_Helpers.listen(item, "mousewheel", this.handleMouseWheel);
    Base_Helpers.listen(item, "DOMMouseScroll", this.handleMouseWheel);
    return Base_Helpers.listen(item, "touchstart", this.handleTouchStart);
  };

  Base_MouseEvents.prototype.remove = function() {
    var k, v, _i, _len, _ref;
    Base_Helpers.unlisten(this.container, "mousedown", this.handleMouseDown);
    Base_Helpers.unlisten(this.container, "mousewheel", this.handleMouseWheel);
    Base_Helpers.unlisten(this.container, "DOMMouseScroll", this.handleMouseWheel);
    Base_Helpers.unlisten(this.container, "touchstart", this.handleTouchStart);
    if (this.whiteList != null) {
      _ref = this.whiteList;
      for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
        v = _ref[k];
        Base_Helpers.unlisten(v, "mousedown", this.handleMouseDown);
        Base_Helpers.unlisten(v, "mousewheel", this.handleMouseWheel);
        Base_Helpers.unlisten(v, "DOMMouseScroll", this.handleMouseWheel);
        Base_Helpers.unlisten(v, "touchstart", this.handleTouchStart);
      }
    }
    Base_Helpers.unlisten(window, "mouseup", this.handleMouseUp);
    Base_Helpers.unlisten(window, "mousemove", this.handleMouseMove);
    Base_Helpers.unlisten(window, "touchend", this.handleTouchEnd);
    Base_Helpers.unlisten(window, "touchcancel", this.handleTouchEnd);
    return Base_Helpers.unlisten(window, "touchmove", this.handleTouchMove);
  };

  /*
    Simple variant - only one listener per event
  */


  Base_MouseEvents.prototype.listen = function(eventName, func) {
    return this.listeners[eventName] = func;
  };

  Base_MouseEvents.prototype.getContainerPosition = function() {
    if (this.cachedContainerPosition != null) {
      return this.cachedContainerPosition;
    } else {
      return this.updateContainerPosition();
    }
  };

  Base_MouseEvents.prototype.updateContainerPosition = function() {
    this.cachedContainerPosition = Base_Helpers.elementPos(this.container);
    return this.cachedContainerPosition;
  };

  Base_MouseEvents.prototype.handleMouseDown = function(event) {
    var e;
    e = this.buildEvent(event, this.ID_MOUSE, event.timeStamp, true);
    this.downHappened(e);
    if (e.consumed) {
      return event.preventDefault();
    }
  };

  Base_MouseEvents.prototype.handleMouseWheel = function(event) {
    var e;
    e = this.buildEvent(event, this.ID_MOUSE, event.timeStamp, true);
    e.wheely = event.wheelDelta | (event.detail * -40);
    this.wheelHappened(e);
    if (e.consumed) {
      return event.preventDefault();
    }
  };

  Base_MouseEvents.prototype.handleMouseUp = function(event) {
    var e, removeAll;
    if (this.hasTouch) {
      return;
    }
    if (event.shiftKey && event.ctrlKey) {
      this.ID_MOUSE = "mouse" + this.mm;
      this.mm += 1;
      return;
    } else {
      removeAll = true;
    }
    e = this.buildEvent(event, this.ID_MOUSE, event.timeStamp, false);
    this.upHappened(e);
    if (e.consumed) {
      event.preventDefault();
    }
    if (removeAll) {
      return this.removeLostTouches(event, [], []);
    }
  };

  Base_MouseEvents.prototype.handleMouseMove = function(event) {
    var e;
    if (this.hasTouch) {
      return;
    }
    e = this.buildEvent(event, this.ID_MOUSE, event.timeStamp, false);
    this.moveHappened(e);
    if (e.consumed) {
      return event.preventDefault();
    }
  };

  Base_MouseEvents.prototype.handleTouchStart = function(event) {
    var consumed, e, list, t, _i, _len, _results;
    if (!this.isTargetOkay(event.target)) {
      return;
    }
    this.hasTouch = true;
    this.removeLostTouches(event, event.touches, event.changedTouches);
    consumed = false;
    list = event.changedTouches || event.touches;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      t = list[_i];
      e = this.buildEvent(t, t.identifier, event.timeStamp, true);
      this.downHappened(e);
      _results.push(consumed |= e.consumed);
    }
    return _results;
  };

  Base_MouseEvents.prototype.handleTouchEnd = function(event) {
    var e, list, t, _i, _len;
    list = event.changedTouches || event.touches;
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      t = list[_i];
      e = this.buildEvent(t, t.identifier, event.timeStamp, false);
      this.upHappened(e);
    }
    return this.removeLostTouches(event, event.touches);
  };

  Base_MouseEvents.prototype.handleTouchMove = function(event) {
    var consumed, e, list, t, _i, _len;
    consumed = false;
    this.removeLostTouches(event, event.touches);
    list = event.changedTouches || event.touches;
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      t = list[_i];
      e = this.buildEvent(t, t.identifier, event.timeStamp, true);
      this.moveHappened(e);
      consumed |= e.consumed;
    }
    if (consumed) {
      return event.preventDefault();
    }
  };

  Base_MouseEvents.prototype.removeLostTouches = function(event, touches, freshTouches) {
    var e, k, p, presentTouches, t, _i, _j, _len, _len1, _ref, _results;
    presentTouches = [];
    for (_i = 0, _len = touches.length; _i < _len; _i++) {
      t = touches[_i];
      presentTouches[t.identifier] = true;
    }
    _ref = this.downPointers;
    for (k in _ref) {
      if (!__hasProp.call(_ref, k)) continue;
      p = _ref[k];
      if (!presentTouches[k]) {
        console.log("Removing touch " + k);
        e = this.rebuildEvent(event, p, false);
        this.upHappened(e);
      }
    }
    if (freshTouches != null) {
      _results = [];
      for (_j = 0, _len1 = freshTouches.length; _j < _len1; _j++) {
        t = freshTouches[_j];
        p = this.downPointers[t.identifier];
        if (p != null) {
          console.log("Removing fresh touch " + t.identifier);
          e = this.rebuildEvent(event, p, false);
          _results.push(this.upHappened(e));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  Base_MouseEvents.prototype.rebuildEvent = function(event, obj, pressed) {
    var e;
    e = new Base_MouseEvent(obj.x, obj.y, event.timeStamp, obj.identifier);
    e.pageX = obj.pageX;
    e.pageY = obj.pageY;
    e.pressed = pressed;
    e.shiftKey = event.shiftKey;
    e.altKey = event.altKey;
    e.ctrlKey = event.ctrlKey;
    e.touch = this.hasTouch;
    return e;
  };

  Base_MouseEvents.prototype.buildEvent = function(event, id, timestamp, pressed) {
    var dx, dy, e, x, y, _ref;
    _ref = this.getContainerPosition(), dx = _ref[0], dy = _ref[1];
    x = event.pageX - dx;
    y = event.pageY - dy;
    e = new Base_MouseEvent(Math.round(x * this.scaleX), Math.round(y * this.scaleY), timestamp, id);
    e.target = event.target;
    e.touch = this.hasTouch;
    e.pageX = event.pageX;
    e.pageY = event.pageY;
    e.shiftKey = event.shiftKey;
    e.altKey = event.altKey;
    e.ctrlKey = event.ctrlKey;
    e.pressed = pressed;
    return e;
  };

  Base_MouseEvents.prototype.downHappened = function(e) {
    if (!this.isTargetOkay(e.target)) {
      return;
    }
    e.pressed = true;
    if (this.downPointers[e.identifier] != null) {
      console.log("Unexpected down on already down pointer");
      return;
    }
    this.downPointers[e.identifier] = {
      x: e.x,
      y: e.y,
      identifier: e.identifier,
      pageX: e.pageX,
      pageY: e.pageY,
      vx: 0,
      vy: 0,
      vt: 0,
      time: e.time
    };
    this.inPointers[e.identifier] = true;
    return this.fireEvent(this.EVENT_DOWN, e);
  };

  Base_MouseEvents.prototype.upHappened = function(e) {
    var fireClick, p,
      _this = this;
    this.cachedContainerPosition = null;
    if (this.downPointers[e.identifier] == null) {
      return;
    }
    p = this.downPointers[e.identifier];
    e.x = e.x | p.x;
    e.y = e.y | p.y;
    this.updateSpeed(p, e, true);
    delete this.downPointers[e.identifier];
    if (Math.abs(e.vx) > Math.abs(e.vy) * 2) {
      e.swipeSpeed = Math.abs(e.vx);
      if (e.vx > 0) {
        e.swipeLeft = true;
      }
      if (e.vx < 0) {
        e.swipeRight = true;
      }
    } else if (Math.abs(e.vy) > Math.abs(e.vx) * 2) {
      e.swipeSpeed = Math.abs(e.vy);
      if (e.vy < 0) {
        e.swipeUp = true;
      }
      if (e.vy > 0) {
        e.swipeDown = true;
      }
    }
    this.fireEvent(this.EVENT_UP, e);
    if (!p.scrolling) {
      if ((this.clickEvent != null) && this.clickEvent.time + this.settings.doubleClickTimeout >= e.time && this.clickEvent.distance(e) < this.settings.doubleClickSensitivity) {
        this.clickEvent = null;
        return this.fireEvent(this.EVENT_DBLCLICK, e);
      } else if (this.settings.noClickOnDoubleClick) {
        this.clickEvent = e;
        fireClick = function() {
          if (_this.clickEvent === e) {
            _this.fireEvent(_this.EVENT_CLICK, _this.clickEvent);
            return _this.clickEvent = null;
          }
        };
        return setTimeout(fireClick, this.settings.doubleClickTimeout);
      } else {
        return this.fireEvent(this.EVENT_CLICK, e);
      }
    }
  };

  Base_MouseEvents.prototype.moveHappened = function(e) {
    var p;
    p = this.downPointers[e.identifier];
    e.pressed = p != null;
    if (p != null) {
      if (e.distance(p) >= this.settings.dragSensitivity || p.scrolling) {
        p.scrolling = true;
        this.updateSpeed(p, e, false);
        return this.fireEvent(this.EVENT_DRAG, e);
      }
    } else if (this.clickEvent) {
      if (this.clickEvent.distance(e) > this.settings.doubleClickSensitivity) {
        this.fireEvent(this.EVENT_CLICK, e);
        return this.clickEvent = null;
      }
    } else if (this.isTargetOkay(e.target)) {
      this.inPointers[e.identifier] = true;
      return this.fireEvent(this.EVENT_MOVE, e);
    } else if (this.inPointers.hasOwnProperty(e.identifier)) {
      delete this.inPointers[e.identifier];
      return this.fireEvent(this.EVENT_LEAVE, e);
    }
  };

  Base_MouseEvents.prototype.updateSpeed = function(p, e, isUp) {
    var dt, dtt;
    e.dx = e.x - p.x;
    e.dy = e.y - p.y;
    p.x = e.x;
    p.y = e.y;
    if (!isUp || e.time - p.time > 100) {
      dt = Math.max(e.time - p.time, 1);
      dtt = Math.max(Math.min(dt, this.settings.speedAveragingPeriod), this.settings.speedAveragingPeriod - p.vt) / this.settings.speedAveragingPeriod;
      p.vx = p.vx * (1 - dtt) + e.dx * 1000 / dt * dtt;
      p.vy = p.vy * (1 - dtt) + e.dy * 1000 / dt * dtt;
      p.vt = Math.min(this.settings.speedAveragingPeriod, p.vt + dt);
    }
    e.vx = p.vx;
    e.vy = p.vy;
    return p.time = e.time;
  };

  Base_MouseEvents.prototype.wheelHappened = function(e) {
    return this.fireEvent(this.EVENT_WHEEL, e);
  };

  Base_MouseEvents.prototype.fireEvent = function(name, event) {
    if (this.listeners[name]) {
      return this.listeners[name].call(this, event);
    }
  };

  Base_MouseEvents.prototype.isTargetOkay = function(target) {
    var k, v, _i, _len, _ref;
    _ref = this.whiteList;
    for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
      v = _ref[k];
      if ((v === target) || Base_Helpers.isParentOf(v, target)) {
        return true;
      }
    }
    return false;
  };

  return Base_MouseEvents;

})();

/*
//@ sourceMappingURL=MouseEvents.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Scene;

Base_Scene = (function() {
  "use strict";
  function Base_Scene() {}

  Base_Scene.prototype.chartWidth = 100;

  Base_Scene.prototype.chartHeight = 100;

  Base_Scene.prototype.toolbarHeight = 0;

  Base_Scene.prototype.x0 = 0;

  Base_Scene.prototype.y0 = 0;

  Base_Scene.prototype.height = 100;

  Base_Scene.prototype.width = 100;

  Base_Scene.prototype.canvasScaleX = 1;

  Base_Scene.prototype.canvasScaleY = 1;

  Base_Scene.prototype.canvasWidth = 100;

  Base_Scene.prototype.canvasHeight = 100;

  Base_Scene.prototype.loading = true;

  Base_Scene.prototype.messages = {};

  Base_Scene.prototype.setMessage = function(origin, msg, pri) {
    var changed;
    if (msg != null) {
      changed = (this.messages[origin] == null) || this.messages[origin].msg !== msg || this.messages[origin].pri !== pri;
      this.messages[origin] = {
        msg: msg,
        pri: pri
      };
    } else {
      changed = this.messages[origin] != null;
      delete this.messages[origin];
    }
    return changed;
  };

  Base_Scene.prototype.getMessage = function() {
    var k, m, mm, pri, _ref;
    m = null;
    pri = 0;
    _ref = this.messages;
    for (k in _ref) {
      mm = _ref[k];
      if (mm.pri > pri) {
        m = mm.msg;
        pri = mm.pri;
      }
    }
    return m;
  };

  return Base_Scene;

})();

/*
//@ sourceMappingURL=Scene.map
*/

// Generated by CoffeeScript 1.6.3
var Base_View;

Base_View = (function() {
  "use strict";
  Base_View.prototype.items = [];

  Base_View.prototype.ui = {};

  Base_View.prototype.options = {};

  Base_View.prototype.baseClass = "view";

  Base_View.prototype.relativeClass = "foo";

  Base_View.prototype.objClass = null;

  Base_View.prototype.parent = null;

  Base_View.prototype.createCoreContainer = true;

  Base_View.prototype.id = null;

  function Base_View(options) {
    var d;
    Base_Helpers.extend(this.options, options);
    this.items = [];
    this.ui = {};
    if (this.options.id) {
      this.id = this.options.id;
    } else {
      d = new Date().getTime();
      this.id = "o" + d;
    }
    this.objClass = Base_Helpers.wrapClass(this, this.baseClass);
    this.relativeClass = Base_Helpers.wrapClass(this, this.relativeClass);
    if (this.createCoreContainer) {
      this.ui.container = Base_Helpers.createDom("div", this.objClass + " " + this.relativeClass, null, options.container ? options.container : null);
    }
  }

  Base_View.prototype.addItem = function(obj, options) {
    var o;
    o = {
      spot: "container"
    };
    Base_Helpers.extend(o, options);
    obj.parent = this;
    obj.id = this.id + "_o" + this.items.length;
    if (!obj.init) {
      throw "no init on obj?";
    }
    obj.init();
    this.items.push({
      obj: obj,
      options: o
    });
    return obj;
  };

  Base_View.prototype.render = function() {
    var i, v, _i, _len, _ref;
    if (this.items) {
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        i = v.obj.render();
        if (i) {
          this.ui[v.options.spot].appendChild(i);
        }
      }
    }
    return this.ui.container;
  };

  Base_View.prototype.toggle = function(show, plain) {
    if (show || !this.visible) {
      return this.show(plain);
    } else if (this.visible) {
      return this.hide(plain);
    }
  };

  Base_View.prototype.show = function(plain, instant) {
    this.visible = true;
    if (!instant) {
      return Base_Helpers.fadeIn(this.ui.container);
    } else {
      return Base_Helpers.show(this.ui.container);
    }
  };

  Base_View.prototype.hide = function(plain, instant) {
    this.visible = false;
    if (!instant) {
      return Base_Helpers.fadeOut(this.ui.container);
    } else {
      return Base_Helpers.hide(this.ui.container);
    }
  };

  Base_View.prototype.onSceneChange = function(ev) {
    if (this.options.onSceneChange) {
      return this.options.onSceneChange(ev);
    } else {
      return console.log("No onSceneChange handler defined for ", this);
    }
  };

  Base_View.prototype.init = function() {
    return this;
  };

  return Base_View;

})();

/*
//@ sourceMappingURL=View.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar_Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar_Item = (function(_super) {
  __extends(Base_Bar_Item, _super);

  "use strict";

  Base_Bar_Item.prototype.options = {};

  Base_Bar_Item.prototype.createCoreContainer = false;

  Base_Bar_Item.prototype.baseClass = "bar";

  function Base_Bar_Item(options) {
    this.options = {
      enclosureClass: null
    };
    Base_Helpers.extend(this.options, options);
    Base_Bar_Item.__super__.constructor.call(this);
  }

  Base_Bar_Item.prototype.init = function() {
    if (!this.options.bare || !this.ui.container) {
      this.ui.container = Base_Helpers.createDom("li", (this.options.enclosureClass != null ? Base_Helpers.wrapClass(this.parent, this.options.enclosureClass) : null));
    }
    if (this.options.onSceneChange || this.options.previewPointerDown) {
      return this.chart().events.addElement(this);
    }
  };

  Base_Bar_Item.prototype.chart = function() {
    if (this.parent instanceof Base_Bar && this.parent.chart) {
      return this.parent.chart;
    } else if (this.parent) {
      return this.parent.chart();
    }
  };

  return Base_Bar_Item;

})(Base_View);

/*
//@ sourceMappingURL=Item.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Settings;

Base_Settings = (function() {
  Base_Settings.defaults = {
    container: void 0,
    width: void 0,
    height: void 0,
    minHeight: 165,
    maxHeight: 2000,
    theme: null,
    assetsUrlBase: "",
    advanced: {
      highDpi: {
        "default": true,
        safari: false,
        firefox: true,
        msie: true,
        chrome: false
      },
      pointer: {
        noClickOnDoubleClick: true,
        dragSensitivity: 10,
        doubleClickSensitivity: 40,
        doubleClickTimeout: 300,
        speedAveragingPeriod: 100
      },
      trackTouches: false,
      logging: false,
      style: {
        messageTextStyle: {
          fillColor: "#000",
          font: "15px Arial"
        },
        loadingArcStyle: {
          r: 35,
          lineColor: "#444",
          lineWidth: 2
        }
      },
      resizerHandleVisibilityTolerance: 45,
      resizerHandleEnableTolerance: 10,
      maxCanvasWidth: 2047,
      maxCanvasHeight: 2047,
      themeCSSClass: "TC-round",
      assets: [],
      builtinAssets: {}
    },
    events: {
      onError: void 0,
      onSettingsChange: void 0
    },
    legend: {
      orientation: "h",
      action: "disable",
      markerSize: 16,
      textStyle: {
        fillColor: "#000",
        font: "12px Arial"
      },
      disabledStyle: {
        fillColor: "#ccc",
        strokeColor: "#ccc"
      }
    }
  };

  function Base_Settings(scriptName) {
    var k, n, prefix, r, r2, v, _ref;
    this.apply(Base_Settings.defaults);
    r = new RegExp("((file:\/\/\/|https?:\/\/)[^\/]+\/.*?)\/?" + scriptName + ".(min.|)js");
    r2 = new RegExp("((file:\/\/\/|https?:\/\/)[^\/]+\/.*\/src)\/?" + scriptName);
    _ref = document.getElementsByTagName("script");
    for (k in _ref) {
      v = _ref[k];
      if (v.src && (n = v.src.match(r))) {
        if (n[1][n[1].length - 1] === "/") {
          prefix = "";
        } else {
          prefix = "/";
        }
        this.assetsUrlBase = n[1] + prefix + "assets/";
      }
      if (v.src && (n = v.src.match(r2))) {
        if (n[1][n[1].length - 1] === "/") {
          prefix = "";
        } else {
          prefix = "/";
        }
        this.assetsUrlBase = n[1] + prefix + "assets/";
      }
    }
  }

  Base_Settings.prototype.apply = function(settings) {
    var changes, theme;
    if (settings == null) {
      return;
    }
    changes = {};
    theme = null;
    if (settings.theme != null) {
      theme = settings.theme;
      delete settings.theme;
    }
    this.applyRec(this, settings, changes, 0);
    if (theme) {
      this.applyRec(this, theme, changes, 0);
      settings.theme = theme;
    }
    return changes;
  };

  Base_Settings.prototype.applyRec = function(target, changes, changedProperties, depth) {
    var a, f, key, o, oa, oo, origValue, skip, value;
    if (depth > 10) {
      throw "Stack depth greater than 10, seems like recursive settings";
    }
    if (target === void 0) {
      console.error(depth, target, changes);
      throw "Tried to applyRec on undefined";
    }
    for (key in changes) {
      value = changes[key];
      origValue = target[key];
      if (origValue !== void 0 && value === origValue) {
        continue;
      }
      a = Base_Helpers.isArray(value);
      o = Base_Helpers.isObject(value);
      oa = Base_Helpers.isArray(origValue);
      oo = Base_Helpers.isObject(origValue);
      f = Base_Helpers.isFunction(value);
      skip = false;
      if (oa && !a) {
        console.error("Applying settings: Setting expected to be array but got something else: " + key + " = " + value);
        skip = true;
      }
      if (value !== null && oo && !o && !f) {
        console.error("Applying settings: Setting expected to be object but got something else: " + key + " = " + value);
        skip = true;
      }
      if (skip) {
        continue;
      }
      if (o) {
        if (!(origValue != null)) {
          if (a) {
            target[key] = [];
            changedProperties[key] = [];
          } else {
            target[key] = {};
            changedProperties[key] = {};
          }
        }
        if (value === null || value === void 0) {
          target[key] = value;
          changedProperties[key] = value;
        }
        if ((typeof value === "object") && typeof target[key] !== "object") {
          target[key] = {};
          changedProperties[key] = {};
        }
        if (key === "container") {
          target[key] = value;
          changedProperties[key] = value;
        } else if (a) {
          target[key] = value;
          changedProperties[key] = value;
        } else {
          if (!changedProperties.hasOwnProperty(key)) {
            changedProperties[key] = {};
          }
          this.applyRec(target[key], value, changedProperties[key], depth + 1);
        }
      } else {
        target[key] = value;
        changedProperties[key] = value;
      }
    }
    return 1;
  };

  Base_Settings.prototype.getAssetUrl = function(asset) {
    if (this.advanced.builtinAssets.hasOwnProperty(asset)) {
      return this.advanced.builtinAssets[asset];
    }
    if (!((this.assetsUrlBase != null) && this.assetsUrlBase.length > 0)) {
      return asset;
    }
    if (asset.indexOf("://") !== -1) {
      return asset;
    }
    if (asset[0] === "/" || asset.indexOf("./") === 0) {
      return asset;
    }
    if (this.assetsUrlBase[this.assetsUrlBase.length - 1] !== "/") {
      return this.assetsUrlBase + "/" + asset;
    } else {
      return this.assetsUrlBase + asset;
    }
  };

  return Base_Settings;

})();

/*
//@ sourceMappingURL=Settings.map
*/

// Generated by CoffeeScript 1.6.3
/*
  Mouse events - have base properties from Base_MouseEvents.
  Additional properties:
  consumed = false, if true - the target tool will be set as active and recieve all future events exclusively until consumed is no longer set.
  cursor = null, cursor to use, (only when consumed = true)
  changes = {}, changes made in scene.
*/

var Base_ChartElement, Base_ChartEvents, Base_SceneEvent,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Base_SceneEvent = (function() {
  function Base_SceneEvent() {}

  Base_SceneEvent.prototype.time = 0;

  Base_SceneEvent.prototype.animating = false;

  Base_SceneEvent.prototype.changes = {};

  return Base_SceneEvent;

})();

Base_ChartElement = (function() {
  function Base_ChartElement() {}

  Base_ChartElement.prototype.animationPriority = 0;

  Base_ChartElement.prototype.remove = function() {
    return false;
  };

  Base_ChartElement.prototype.doAnimations = function(sceneEvent) {
    return false;
  };

  Base_ChartElement.prototype.paintScene = function(sceneEvent) {
    return false;
  };

  Base_ChartElement.prototype.onSceneChange = function(event) {
    return false;
  };

  Base_ChartElement.prototype.onClick = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onDoubleClick = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onPointerDown = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onPointerUp = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onPointerDrag = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onPointerMove = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onPointerOut = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onWheel = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.onKeyDown = function(keyEvent) {
    return false;
  };

  Base_ChartElement.prototype.previewWheel = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.previewPointerDown = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.previewPointerUp = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.previewPointerDrag = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.previewPointerMove = function(mouseEvent) {
    return false;
  };

  Base_ChartElement.prototype.previewPointerOut = function(mouseEvent) {
    return false;
  };

  return Base_ChartElement;

})();

Base_ChartEvents = (function() {
  "use strict";
  Base_ChartEvents.prototype.container = null;

  Base_ChartEvents.prototype.paintRequested = false;

  Base_ChartEvents.prototype.mouseEvents = null;

  function Base_ChartEvents(container, canvas, chart) {
    this.container = container;
    this.canvas = canvas;
    this.chart = chart;
    this._paintScene = __bind(this._paintScene, this);
    this.kd = __bind(this.kd, this);
    this.mw = __bind(this.mw, this);
    this.mdbl = __bind(this.mdbl, this);
    this.mcl = __bind(this.mcl, this);
    this.mlve = __bind(this.mlve, this);
    this.mmve = __bind(this.mmve, this);
    this.mdrg = __bind(this.mdrg, this);
    this.mup = __bind(this.mup, this);
    this.mdwn = __bind(this.mdwn, this);
    this.settings = this.chart.settings;
    this.elements = [];
    this.elementsReverse = [];
    this.pointerToElement = {};
    this.sceneChanges = {};
    this.animationOrder = [];
    this.hooks = {};
    this.mouseEvents = new Base_MouseEvents(this.container, this.settings.advanced.pointer, this.chart, this.whiteList);
    this.mouseEvents.listen(this.mouseEvents.EVENT_DOWN, this.mdwn);
    this.mouseEvents.listen(this.mouseEvents.EVENT_UP, this.mup);
    this.mouseEvents.listen(this.mouseEvents.EVENT_DRAG, this.mdrg);
    this.mouseEvents.listen(this.mouseEvents.EVENT_MOVE, this.mmve);
    this.mouseEvents.listen(this.mouseEvents.EVENT_LEAVE, this.mlve);
    this.mouseEvents.listen(this.mouseEvents.EVENT_CLICK, this.mcl);
    this.mouseEvents.listen(this.mouseEvents.EVENT_DBLCLICK, this.mdbl);
    this.mouseEvents.listen(this.mouseEvents.EVENT_WHEEL, this.mw);
    Base_Helpers.listen(this.container, "keydown", this.kd);
  }

  Base_ChartEvents.prototype.addWhiteList = function(item) {
    return this.mouseEvents.addWhiteList(item);
  };

  Base_ChartEvents.prototype.remove = function() {
    this.mouseEvents.remove();
    return Base_Helpers.unlisten(this.container, "keydown", this.kd);
  };

  Base_ChartEvents.prototype.setScaling = function(x, y) {
    this.mouseEvents.scaleX = x;
    return this.mouseEvents.scaleY = y;
  };

  Base_ChartEvents.prototype.addElement = function(element) {
    element.animationPriority = element.animationPriority || 0;
    this.elements.push(element);
    this.elementsReverse.splice(0, 0, element);
    this.animationOrder = this.elements.slice(0);
    this.animationOrder.sort(function(a, b) {
      return b.animationPriority - a.animationPriority;
    });
    return element;
  };

  Base_ChartEvents.prototype.notifySceneChanges = function(changes) {
    if (!Base_Helpers.hasProperties(changes)) {
      return;
    }
    Base_Helpers.extendTrue(this.sceneChanges, changes);
    return this._requestPaint();
  };

  Base_ChartEvents.prototype.addHook = function(obj, hook, callback) {
    if (typeof this.hooks[hook] === "undefined") {
      this.hooks[hook] = [];
    }
    return this.hooks[hook].push({
      obj: obj,
      callback: callback
    });
  };

  Base_ChartEvents.prototype.hook = function(hook, arg, caller) {
    var v, _i, _len, _ref, _results;
    this.chart.log("firing hook", {
      hook: hook,
      arg: arg,
      caller: caller
    });
    if (this.hooks[hook]) {
      _ref = this.hooks[hook];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        _results.push(v.callback.call(v.obj, hook, arg, caller));
      }
      return _results;
    }
  };

  Base_ChartEvents.prototype.mdwn = function(event) {
    var element;
    element = this._notifyMouseEvent(event, "PointerDown");
    this.pointerToElement[event.identifier] = element;
    this.notifySceneChanges(event.changes);
    return this.container.focus();
  };

  Base_ChartEvents.prototype.mup = function(event) {
    this._notifyMouseEvent(event, "PointerUp");
    this.pointerToElement[event.identifier] = null;
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.mdrg = function(event) {
    var element;
    element = this._notifyMouseEvent(event, "PointerDrag");
    this.pointerToElement[event.identifier] = element;
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.mmve = function(event) {
    var element;
    element = this._notifyMouseEvent(event, "PointerMove");
    this.pointerToElement[event.identifier] = element;
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.mlve = function(event) {
    this._notifyMouseEvent(event, "PointerOut");
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.mcl = function(event) {
    this._notifyMouseEvent(event, "Click");
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.mdbl = function(event) {
    this._notifyMouseEvent(event, "DoubleClick");
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.mw = function(event) {
    this._notifyMouseEvent(event, "Wheel");
    return this.notifySceneChanges(event.changes);
  };

  Base_ChartEvents.prototype.kd = function(event) {
    if (!event.keyCode) {
      event.keyCode = event.which;
    }
    this._notifyKeyEvent(event, "KeyDown");
    this.notifySceneChanges(event.changes);
    if (event.consumed) {
      return event.preventDefault();
    }
  };

  Base_ChartEvents.prototype._notifyMouseEvent = function(event, name) {
    var element, firstCursor, funcName, _i, _j, _len, _len1, _ref, _ref1;
    event.changes = {};
    event.consumed = false;
    event.cursor = null;
    funcName = "preview" + name;
    _ref = this.elementsReverse;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (element[funcName] != null) {
        element[funcName].call(element, event);
      }
    }
    funcName = "on" + name;
    element = this.pointerToElement[event.identifier];
    if (element) {
      if (element[funcName] != null) {
        element[funcName].call(element, event);
        if (event.consumed) {
          if (event.cursor) {
            this.container.style.cursor = event.cursor;
          }
          return element;
        }
      }
    }
    firstCursor = null;
    _ref1 = this.elementsReverse;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      element = _ref1[_j];
      if (element[funcName] != null) {
        element[funcName].call(element, event);
        if (event.consumed) {
          if (event.cursor) {
            this.container.style.cursor = event.cursor;
          }
          return element;
        } else if ((firstCursor == null) && (event.cursor != null)) {
          firstCursor = event.cursor;
        }
      }
    }
    this.container.style.cursor = firstCursor;
    return null;
  };

  Base_ChartEvents.prototype._notifyKeyEvent = function(event, name) {
    var element, funcName, _i, _len, _ref;
    event.changes = {};
    event.consumed = false;
    event.cursor = null;
    funcName = "on" + name;
    _ref = this.elementsReverse;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (element[funcName] != null) {
        element[funcName].call(element, event);
        if (event.consumed) {
          break;
        }
      }
    }
    return null;
  };

  Base_ChartEvents.prototype._paintScene = function() {
    var e, el, event, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    this.paintRequested = false;
    event = new Base_SceneEvent();
    event.time = new Date().getTime();
    event.changes = this.sceneChanges;
    this.sceneChanges = {};
    _ref = this.elementsReverse;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      if (el.onSceneChange != null) {
        el.onSceneChange(event);
      }
    }
    event.context = this.prepareContext(event);
    _ref1 = this.animationOrder;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      e = _ref1[_j];
      if (e.doAnimations != null) {
        e.doAnimations(event);
      }
    }
    _ref2 = this.elements;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      e = _ref2[_k];
      if (e.paintScene != null) {
        e.paintScene(event);
      }
    }
    if (event.animating) {
      return this._requestPaint();
    }
  };

  Base_ChartEvents.prototype.paintToImage = function(scaling, type, transparent) {
    var canvas, context, e, event, scene, _i, _len, _ref;
    scene = this.chart.scene;
    if (!scaling) {
      scaling = 1;
    }
    canvas = document.createElement("canvas");
    canvas.width = scene.canvasWidth * scaling * this.scaleX;
    canvas.height = scene.canvasHeight * scaling * this.scaleY;
    context = canvas.getContext("2d");
    context.setTransform(scaling * this.scaleX, 0, 0, scaling * this.scaleY, 0, 0);
    if (!transparent) {
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    event = new Base_SceneEvent();
    event.time = new Date().getTime();
    event.changes = {};
    event.context = context;
    _ref = this.elements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.paintScene != null) {
        e.paintScene(event);
      }
    }
    return canvas.toDataURL(type);
  };

  Base_ChartEvents.prototype.prepareContext = function(event) {
    var context, heightPx, scene, widthPx;
    if (event.changes.bounds) {
      scene = this.chart.scene;
      this.scaleX = Math.min(scene.canvasScaleX, scene.settings.advanced.maxCanvasWidth / scene.canvasWidth);
      this.scaleY = Math.min(scene.canvasScaleY, scene.settings.advanced.maxCanvasHeight / scene.canvasHeight);
      widthPx = Math.round(scene.canvasWidth * this.scaleX);
      heightPx = Math.round(scene.canvasHeight * this.scaleY);
      this.canvas.width = widthPx;
      this.canvas.height = heightPx;
      this.canvas.style.width = "" + scene.canvasWidth + "px";
      this.canvas.style.height = "" + scene.canvasHeight + "px";
    }
    context = this.canvas.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.setTransform(this.scaleX, 0, 0, this.scaleY, 0, 0);
    return context;
  };

  Base_ChartEvents.prototype._requestPaint = function() {
    if (!this.paintRequested) {
      requestAnimationFrame(this._paintScene);
      return this.paintRequested = true;
    }
  };

  return Base_ChartEvents;

})();

/*
//@ sourceMappingURL=ChartEvents.map
*/

// Generated by CoffeeScript 1.6.3
var Base_TouchMarkers,
  __hasProp = {}.hasOwnProperty;

Base_TouchMarkers = (function() {
  "use strict";
  Base_TouchMarkers.prototype.animationPriority = 0;

  Base_TouchMarkers.prototype.scene = null;

  Base_TouchMarkers.prototype.touches = {};

  Base_TouchMarkers.prototype.text = null;

  Base_TouchMarkers.prototype.fps = 0;

  Base_TouchMarkers.prototype.fpsAveragingPeriod = 1000;

  Base_TouchMarkers.prototype.prevFrame = null;

  function Base_TouchMarkers(scene) {
    this.scene = scene;
    this.scene.frameCount = 0;
    this.touches = {};
  }

  Base_TouchMarkers.prototype.paintScene = function(event) {
    var count, dt, fp, g, k, p, prop, t, _i, _len, _ref, _ref1;
    this.scene.frameCount += 1;
    if (this.prevFrame) {
      dt = Math.max(event.time - this.prevFrame, 1) / 1000;
      fp = 1 / dt;
      prop = Math.min(1, dt * 3);
      this.fps = this.fps * (1 - prop) + fp * prop;
    }
    this.prevFrame = event.time;
    g = event.context;
    g.strokeStyle = "#000";
    g.fillStyle = "#000";
    g.beginPath();
    count = 0;
    _ref = this.touches;
    for (k in _ref) {
      if (!__hasProp.call(_ref, k)) continue;
      t = _ref[k];
      count += 1;
      g.moveTo(t.dx + 10, t.dy);
      g.arc(t.dx, t.dy, 10, 0, Math.PI * 2);
      g.moveTo(t.x + 30, t.y);
      g.arc(t.x, t.y, 30, 0, Math.PI * 2);
      g.moveTo(t.dx, t.dy);
      _ref1 = t.trace;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        p = _ref1[_i];
        g.lineTo(p.x, p.y);
        g.arc(p.x, p.y, 3, 0, Math.PI * 2);
      }
    }
    g.stroke();
    g.textAlign = "start";
    g.textBaseline = "middle";
    return g.fillText("FPS: " + (Math.round(this.fps)) + ", touches: " + count, this.scene.x0 + this.scene.width / 3, 20);
  };

  Base_TouchMarkers.prototype.previewPointerDown = function(event) {
    var k, t, _ref;
    _ref = this.touches;
    for (k in _ref) {
      if (!__hasProp.call(_ref, k)) continue;
      t = _ref[k];
      if (t.up) {
        delete this.touches[k];
      }
    }
    this.touches[event.identifier] = {
      dx: event.x,
      dy: event.y,
      up: false,
      trace: []
    };
    return event.changes.pointers = true;
  };

  Base_TouchMarkers.prototype.previewPointerDrag = function(event) {
    var t;
    t = this.touches[event.identifier];
    t.x = event.x;
    t.y = event.y;
    return t.trace.push({
      x: t.x,
      y: t.y
    });
  };

  Base_TouchMarkers.prototype.previewPointerUp = function(event) {
    this.touches[event.identifier].up = true;
    return this.previewPointerDrag(event);
  };

  return Base_TouchMarkers;

})();

/*
//@ sourceMappingURL=TouchMarkers.map
*/

// Generated by CoffeeScript 1.6.3
var Base_MessagesOverlay;

Base_MessagesOverlay = (function() {
  "use strict";
  Base_MessagesOverlay.prototype.animationPriority = 0;

  Base_MessagesOverlay.prototype.scene = null;

  Base_MessagesOverlay.prototype.loadingTime = null;

  function Base_MessagesOverlay(chart) {
    this.chart = chart;
    this.scene = chart.scene;
  }

  Base_MessagesOverlay.prototype.doAnimations = function(event) {
    if (this.scene.loading) {
      return event.animating = true;
    }
  };

  Base_MessagesOverlay.prototype.paintScene = function(event) {
    var a, arcStyle, g, grad, height, loading, msg, r, scene, w, width, x, y, yy;
    scene = this.scene;
    msg = this.scene.getMessage();
    loading = this.scene.loading;
    if (!loading) {
      this.loadingTime = null;
    }
    if (!((msg != null) || loading)) {
      return;
    }
    if (this.loadingTime == null) {
      this.loadingTime = event.time;
    }
    arcStyle = this.scene.settings.advanced.style.loadingArcStyle;
    g = event.context;
    if (arcStyle.location === "corner") {
      x = scene.x0 + scene.width;
      y = scene.y0;
    } else {
      x = scene.x0 + scene.width / 2;
      y = scene.y0 + scene.height / 2;
    }
    if (msg != null) {
      Base_Graphics.textStyle(g, this.scene.settings.advanced.style.messageTextStyle);
      g.textBaseline = "middle";
      g.textAlign = "center";
      height = g.measureText("M").width * 1.5;
      width = g.measureText(msg).width;
      if (arcStyle.location === "corner") {
        x -= width;
        y += height * 1.5;
      }
      if (this.scene.loading) {
        y -= height;
        yy = y + arcStyle.r + height;
      } else {
        yy = y;
      }
      g.fillText(msg, x, yy);
    }
    if (this.scene.loading) {
      r = arcStyle.r;
      w = arcStyle.lineWidth;
      if (!msg && arcStyle.location === "corner") {
        x -= (r + w) * 1.2;
        y += (r + w) * 1.2;
      }
      g.save();
      g.lineCap = 'round';
      g.lineWidth = w;
      a = (event.time - this.loadingTime) / 700 * Math.PI;
      grad = g.createLinearGradient(x + r * Math.cos(a + Math.PI), y + r * Math.sin(a + Math.PI), x + r * Math.cos(a), y + r * Math.sin(a));
      grad.addColorStop(0, arcStyle.lineColor);
      grad.addColorStop(1, "transparent");
      g.strokeStyle = grad;
      g.beginPath();
      g.arc(x, y, r, a, a + Math.PI);
      g.stroke();
      return g.restore();
    }
  };

  return Base_MessagesOverlay;

})();

/*
//@ sourceMappingURL=MessagesOverlay.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Resizer;

Base_Resizer = (function() {
  Base_Resizer.prototype.chart = null;

  Base_Resizer.prototype.oh = 0;

  Base_Resizer.prototype.sy = 0;

  Base_Resizer.prototype.barVisible = false;

  Base_Resizer.prototype.resizing = false;

  function Base_Resizer(chart) {
    this.chart = chart;
    this.scene = this.chart.scene;
    this.layers = this.chart.layers;
  }

  Base_Resizer.prototype.onPointerOut = function(ev) {
    return this.hideUI();
  };

  Base_Resizer.prototype.onPointerMove = function(ev) {
    var dy;
    dy = this.scene.chartHeight - ev.y;
    if (dy < this.scene.settings.advanced.resizerHandleVisibilityTolerance) {
      if (!this.barVisible) {
        this.showUI();
      }
      if (dy < this.scene.settings.advanced.resizerHandleEnableTolerance) {
        ev.consumed = true;
        return ev.cursor = "ns-resize";
      }
    } else {
      if (this.barVisible) {
        return this.hideUI();
      }
    }
  };

  Base_Resizer.prototype.onPointerDown = function(ev) {
    var dy;
    this.sy = ev.y;
    dy = this.scene.chartHeight - ev.y;
    this.resizing = dy < this.scene.settings.advanced.resizerHandleEnableTolerance && ev.y <= this.scene.chartHeight;
    if (this.resizing) {
      this.oh = this.scene.chartHeight;
      this.showUI();
      ev.cursor = "ns-resize";
      return ev.consumed = true;
    }
  };

  Base_Resizer.prototype.onDoubleClick = function(ev) {
    var dy, h, s;
    this.sy = ev.y;
    dy = this.scene.chartHeight - ev.y;
    if (dy < this.scene.settings.advanced.resizerHandleEnableTolerance && ev.y <= this.scene.chartHeight) {
      ev.consumed = true;
      if (this.wasMaximized) {
        h = this.originalHeight;
        this.wasMaximized = false;
      } else {
        this.originalHeight = this.oh;
        this.wasMaximized = true;
        s = Base_Helpers.getScroll();
        h = this.oh + s[1] + window.innerHeight - ev.pageY - dy - 10;
      }
      this.scene.settings.height = Math.min(this.scene.settings.maxHeight, Math.max(this.scene.settings.minHeight, h));
      return this.chart.updateSize();
    }
  };

  Base_Resizer.prototype.onPointerDrag = function(ev) {
    if (this.resizing) {
      ev.consumed = true;
      this.wasMaximized = false;
      this.scene.settings.height = Math.min(this.scene.settings.maxHeight, Math.max(this.scene.settings.minHeight, this.oh + (ev.y - this.sy)));
      return this.chart.updateSize();
    }
  };

  Base_Resizer.prototype.showUI = function() {
    if (this.barVisible) {
      return;
    }
    this.barVisible = true;
    return Base_Helpers.fadeIn(this.layers.resizerBar);
  };

  Base_Resizer.prototype.hideUI = function() {
    if (!this.barVisible) {
      return;
    }
    this.barVisible = false;
    this.resizing = false;
    return Base_Helpers.fadeOut(this.layers.resizerBar);
  };

  return Base_Resizer;

})();

/*
//@ sourceMappingURL=Resizer.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Impl,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty;

Base_Impl = (function() {
  "use strict";
  Base_Impl.prototype.container = null;

  Base_Impl.prototype.settings = null;

  Base_Impl.prototype.scene = null;

  Base_Impl.prototype.layers = null;

  Base_Impl.prototype.removed = false;

  Base_Impl.prototype.eventListeners = {};

  Base_Impl.prototype.eventDelayedCalls = {};

  Base_Impl.prototype.assetsLoaded = true;

  Base_Impl.prototype.initialized = false;

  Base_Impl.prototype.previusSizeW = 0;

  Base_Impl.prototype.previusSizeH = 0;

  Base_Impl.prototype.initializeImpl = function() {
    return Base_Helpers.error("Need to override initializeImpl");
  };

  Base_Impl.prototype.removeImpl = function() {
    return Base_Helpers.error("Need to override removeImpl");
  };

  Base_Impl.prototype.updateSettings = function(curSettings, changes) {
    return Base_Helpers.error("Need to override updateSettings");
  };

  Base_Impl.prototype.updateSizeImpl = function(width, height) {
    return Base_Helpers.error("Need to override updateSizeImpl");
  };

  function Base_Impl(api) {
    var browser, sx, sy, _ref;
    this.api = api;
    this.defaultError = __bind(this.defaultError, this);
    this.loadAssets = __bind(this.loadAssets, this);
    this.updateSize = __bind(this.updateSize, this);
    /*
      Subclass constructor musrt prepare @settings, @scene, @layers before calling super
    */

    this.eventListeners = {};
    this.eventDelayedCalls = {};
    if (this.settings.advanced.assets != null) {
      this.loadAssets(this.settings.advanced.assets);
    }
    browser = Base_Helpers.detectBrowser();
    _ref = Base_Helpers.canvasScaling(), sx = _ref[0], sy = _ref[1];
    if ((this.settings.advanced.highDpi.hasOwnProperty(browser) && this.settings.advanced.highDpi[browser]) || this.settings.advanced.highDpi["default"]) {
      this.scene.canvasScaleX = sx;
      this.scene.canvasScaleY = sy;
    } else {
      this.scene.canvasScaleX = 1;
      this.scene.canvasScaleY = 1;
    }
    this.container = this.settings.container;
    if (this.container._DVSL_ChartInstance !== void 0 && this.container._DVSL_ChartInstance !== null) {
      this.container._DVSL_ChartInstance.remove();
    }
    this.container._DVSL_ChartInstance = this;
    this.container.appendChild(this.layers.container);
    this.events = new Base_ChartEvents(this.layers.mouseTrackLayer, this.layers.canvas, this);
  }

  Base_Impl.prototype.initialize = function() {
    var _this = this;
    if (this.initialized) {
      return;
    }
    this.log("Initializing chart");
    if (!this.assetsLoaded) {
      setTimeout((function() {
        return _this.initialize();
      }), 50);
      return;
    }
    this.initializeImpl();
    if (this.settings.advanced.trackTouches) {
      this.events.addElement(new Base_TouchMarkers(this.scene));
    }
    Base_Helpers.listen(window, "resize", this.updateSize);
    this.log("Chart iniitalized");
    return this.initialized = true;
  };

  Base_Impl.prototype.remove = function() {
    this.initialized = false;
    this.removed = true;
    this.events.remove();
    this.container.removeChild(this.layers.container);
    this.removeImpl();
    this.layers = null;
    this.scene = null;
    this.events = null;
    this.container._DVSL_ChartInstance = void 0;
    return Base_Helpers.unlisten(window, "resize", this.updateSize);
  };

  Base_Impl.prototype.updateSize = function(force) {
    var clientHeight, clientWidth;
    if (force == null) {
      force = false;
    }
    clientWidth = this.settings.width != null ? this.settings.width : this.layers.container.clientWidth;
    clientHeight = this.settings.height != null ? this.settings.height : this.layers.container.clientHeight;
    if (clientWidth !== this.previusSizeW || clientHeight !== this.previusSizeH || force) {
      this.previusSizeH = clientHeight;
      this.previusSizeW = clientWidth;
      return this.updateSizeImpl(clientWidth, clientHeight);
    }
  };

  /* events*/


  Base_Impl.prototype.on = function(event, handler) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    return this.eventListeners[event].push(handler);
  };

  Base_Impl.prototype.off = function(event, handler) {
    if (this.eventListeners[event] != null) {
      return Base_Helpers.removeFromArray(this.eventListeners[event], handler);
    }
  };

  Base_Impl.prototype.updateEvents = function(oldSettings, newSettings, eventMap) {
    var event, prop, _results;
    _results = [];
    for (event in eventMap) {
      prop = eventMap[event];
      if (oldSettings[prop] != null) {
        this.off(event, oldSettings[prop]);
      }
      if (newSettings[prop] != null) {
        _results.push(this.on(event, newSettings[prop]));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Base_Impl.prototype.dispatchEventParams = function(name, params, defaultFunc, delay) {
    var event, key, value;
    if (delay == null) {
      delay = 0;
    }
    if (!(defaultFunc || ((this.eventListeners[name] != null) && this.eventListeners[name].length > 0))) {
      return;
    }
    event = Base_Helpers.createEvent(name);
    for (key in params) {
      if (!__hasProp.call(params, key)) continue;
      value = params[key];
      event[key] = value;
    }
    return this.dispatchEvent(name, event, defaultFunc, delay);
  };

  Base_Impl.prototype.cancelDelayedEvent = function(name) {
    return this.eventDelayedCalls[name] = null;
  };

  Base_Impl.prototype.dispatchEvent = function(name, event, defaultFunc, delay) {
    var fn, l, runDefault, _i, _len, _ref,
      _this = this;
    if (delay == null) {
      delay = 0;
    }
    if (!(defaultFunc || ((this.eventListeners[name] != null) && this.eventListeners[name].length > 0))) {
      return;
    }
    if (delay > 0) {
      this.eventDelayedCalls[name] = event;
      fn = function() {
        if (_this.eventDelayedCalls[name] === event) {
          return _this.dispatchEvent(name, event, defaultFunc, 0);
        }
      };
      setTimeout(fn, delay);
      return;
    }
    if (this.eventListeners[name] != null) {
      runDefault = false;
      _ref = this.eventListeners[name];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        runDefault |= l.call(this.api, event);
      }
    } else {
      runDefault = true;
    }
    if (runDefault && (defaultFunc != null)) {
      return defaultFunc.call(this.api, event);
    }
  };

  Base_Impl.prototype.notifySettingsChanged = function(changes, origin) {
    return this.dispatchEventParams("settingsChange", this.extendEventParams({
      changes: changes,
      origin: origin
    }), null);
  };

  Base_Impl.prototype.loadAssets = function(assets) {
    var loader,
      _this = this;
    this.assetsLoaded = false;
    loader = function(i) {
      _this.timeout = 0;
      if (assets.length > i) {
        return _this.loadAsset(assets[i], function() {
          return loader(i + 1);
        });
      } else {
        return _this.assetsLoaded = true;
      }
    };
    return loader(0);
  };

  Base_Impl.prototype.error = function(msg, arg) {
    return this.dispatchEventParams("error", {
      "message": msg,
      "arg": arg
    }, this.defaultError);
  };

  Base_Impl.prototype.log = function(msg, arg) {
    if (this.settings.advanced.logging) {
      return Base_Helpers.log(msg, arg);
    }
  };

  Base_Impl.prototype.defaultError = function(event) {
    if (this.settings.events.onError) {
      this.settings.events.onError(event);
    }
    return Base_Helpers.error(event.message, event.arg ? event.arg : null);
  };

  Base_Impl.prototype.loadAsset = function(asset, callback) {
    var elem, ext, url,
      _this = this;
    url = asset.src;
    url = this.settings.getAssetUrl(asset);
    ext = Base_Helpers.getExtension(asset);
    if (ext === "css") {
      elem = document.createElement("link");
      elem.setAttribute("rel", "stylesheet");
      elem.setAttribute("href", url);
      elem.setAttribute("type", "text/css");
      elem.addEventListener("load", function() {
        return callback();
      });
      elem.addEventListener("error", function() {
        _this.error("Assets: Failed to load asset", asset);
        return callback();
      });
      document.getElementsByTagName("head")[0].appendChild(elem);
      return this.timeout = setTimeout(function() {
        var img;
        if (_this.timeout) {
          img = document.createElement('img');
          img.onerror = function() {
            return callback();
          };
          return img.src = url;
        }
      }, 200);
    } else if (ext === "js") {
      elem = document.createElement("script");
      elem.setAttribute("src", url);
      elem.setAttribute("type", "text/javascript");
      elem.addEventListener("load", function() {
        return callback();
      });
      elem.addEventListener("error", function() {
        this.error("Assets: Failed to load asset", asset);
        return callback();
      });
      return document.getElementsByTagName("head")[0].appendChild(elem);
    } else {
      this.error("Assets: Do not know how to load", asset);
      return callback();
    }
  };

  return Base_Impl;

})();

/*
//@ sourceMappingURL=Impl.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Highlight, Timechart_Marker, Timechart_Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Marker = (function() {
  function Timechart_Marker() {}

  Timechart_Marker.prototype.time = 0;

  Timechart_Marker.prototype.label = 0;

  Timechart_Marker.prototype.style = null;

  return Timechart_Marker;

})();

Timechart_Highlight = (function() {
  function Timechart_Highlight() {}

  Timechart_Highlight.prototype.from = 0;

  Timechart_Highlight.prototype.to = 0;

  Timechart_Highlight.prototype.style = null;

  return Timechart_Highlight;

})();

Timechart_Scene = (function(_super) {
  __extends(Timechart_Scene, _super);

  "use strict";

  Timechart_Scene.prototype.settings = null;

  Timechart_Scene.prototype.leftValueAxisSize = null;

  Timechart_Scene.prototype.rightValueAxisSize = null;

  Timechart_Scene.prototype.timeAxisSize = null;

  Timechart_Scene.prototype.timeStart = 0;

  Timechart_Scene.prototype.timeEnd = 0;

  Timechart_Scene.prototype.anchor = null;

  Timechart_Scene.prototype.period = null;

  Timechart_Scene.prototype.displayUnit = null;

  Timechart_Scene.prototype.displayUnitMaxSize = 200;

  Timechart_Scene.prototype.displayUnitMinSize = 16;

  Timechart_Scene.prototype.data = null;

  Timechart_Scene.prototype.maxValue = 0;

  Timechart_Scene.prototype.selectionStart = null;

  Timechart_Scene.prototype.selectionEnd = null;

  Timechart_Scene.prototype.minorTimeFormat = null;

  Timechart_Scene.prototype.minorTimeUnit = null;

  Timechart_Scene.prototype.majorTimeFormat = null;

  Timechart_Scene.prototype.majorTimeUnit = null;

  Timechart_Scene.prototype.markers = [];

  Timechart_Scene.prototype.highlights = {};

  Timechart_Scene.prototype.backStack = [];

  function Timechart_Scene(settings) {
    this.settings = settings;
    this.messages = {};
    this.highlights = {};
    this.markers = [];
    this.backStack = [];
  }

  Timechart_Scene.prototype.getNow = function() {
    return new Date().getTime() + this.settings.data.timeOffset;
  };

  Timechart_Scene.prototype.setTimeRange = function(minTime, maxTime, unit) {
    if (!unit) {
      Base_Helpers.error("Scene.setTimeRange: no display unit");
    }
    this.timeStart = minTime;
    this.timeEnd = maxTime;
    return this.displayUnit = unit;
  };

  Timechart_Scene.prototype.pixelsPerTime = function() {
    return this.width / (this.timeEnd - this.timeStart);
  };

  Timechart_Scene.prototype.xyInChart = function(x, y) {
    return (x >= this.x0) && (x < this.x0 + this.width) && (y >= this.y0) && (y < this.y0 + this.height);
  };

  Timechart_Scene.prototype.xyInChartOrTime = function(x, y) {
    return (x >= this.x0) && (x < this.x0 + this.width) && (y >= this.y0) && (y < this.y0 + this.height + this.timeAxisSize);
  };

  Timechart_Scene.prototype.xyInTimeBar = function(x, y) {
    return x >= this.x0 && x < this.x0 + this.width && y >= this.y0 + this.height && y < this.y0 + this.height + this.timeAxisSize;
  };

  Timechart_Scene.prototype.getScale = function() {
    return (this.timeEnd - this.timeStart) / this.width;
  };

  Timechart_Scene.prototype.timeToX = function(time) {
    return this.x0 + this.width * (time - this.timeStart) / (this.timeEnd - this.timeStart);
  };

  Timechart_Scene.prototype.timeToXCoefs = function() {
    return [this.x0 - this.timeStart * this.width / (this.timeEnd - this.timeStart), this.width / (this.timeEnd - this.timeStart)];
  };

  Timechart_Scene.prototype.xToTime = function(x) {
    return this.timeStart + (this.timeEnd - this.timeStart) * (x - this.x0) / this.width;
  };

  Timechart_Scene.prototype.dxToDtime = function(dx) {
    return dx / this.width * (this.timeEnd - this.timeStart);
  };

  Timechart_Scene.prototype.snapTimeDown = function(time) {
    return this.displayUnit.roundTimeDown(time);
  };

  Timechart_Scene.prototype.snapTimeUp = function(time) {
    return this.displayUnit.roundTimeUp(time);
  };

  Timechart_Scene.prototype.snapTimeRound = function(time) {
    return this.displayUnit.roundTimeRound(time);
  };

  Timechart_Scene.prototype.getDataPeriod = function(withMarkers) {
    var from, marker, to, _i, _len, _ref;
    if (withMarkers == null) {
      withMarkers = true;
    }
    from = this.data.dataLimitFrom;
    to = this.data.dataLimitTo;
    if (!((from != null) && (to != null))) {
      return [null, null];
    }
    if (withMarkers) {
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        from = Math.min(from, marker.time);
        to = Math.max(to, marker.time);
      }
    }
    return [from, to];
  };

  /*
    Retrieves time range corresponding to click
  */


  Timechart_Scene.prototype.getClickRange = function(time, y) {
    var mt0, mt1, numBars, t0, t1, use1Bar;
    if ((this.selectionStart != null) && time >= this.selectionStart && time < this.selectionEnd) {
      t0 = this.selectionStart;
      t1 = this.selectionEnd;
      numBars = Math.max(2, this.displayUnit.numberOfUnits(t0, t1));
    } else if (this.displayUnit) {
      use1Bar = true;
      if (this.majorTimeUnit != null) {
        mt0 = this.majorTimeUnit.roundTimeDown(time);
        mt1 = this.majorTimeUnit.roundTimeUp(time + 1);
        if ((y != null) && y > this.y0 + this.height && (mt0 > this.timeStart || mt1 < this.timeEnd)) {
          t0 = mt0;
          t1 = mt1;
          numBars = this.displayUnit.numberOfUnits(t0, t1);
          use1Bar = false;
        }
      }
      if (use1Bar) {
        t0 = this.displayUnit.roundTimeDown(time);
        t1 = this.displayUnit.roundTimeUp(time + 1);
        numBars = 1;
      }
    } else {
      t0 = null;
      t1 = null;
      numBars = null;
    }
    return [t0, t1, numBars];
  };

  Timechart_Scene.prototype.getClickBar = function(time) {
    return [this.displayUnit.roundTimeDown(time), this.displayUnit.roundTimeUp(time + 1)];
  };

  Timechart_Scene.prototype.pushBack = function(from, to, unit) {
    this.backStack.push([from, to, unit]);
    if (this.backStack.length > 1000) {
      return this.backStack = this.backStack.slice(200);
    }
  };

  Timechart_Scene.prototype.popBack = function() {
    return this.backStack.pop();
  };

  Timechart_Scene.prototype.getCurTime = function() {
    return new Date().getTime() + this.settings.data.timeOffset;
  };

  Timechart_Scene.prototype.setHighlight = function(name, from, to, style) {
    var h;
    h = this.highlights[name];
    if (h == null) {
      h = {};
      this.highlights[name] = h;
    }
    h.from = from;
    h.to = to;
    h.style = style;
    return h;
  };

  Timechart_Scene.prototype.removeHighlight = function(name, keepTrack) {
    if (keepTrack == null) {
      keepTrack = false;
    }
    if (this.highlights[name] == null) {
      return;
    }
    this.highlights[name].keepTrack = keepTrack;
    return delete this.highlights[name];
  };

  return Timechart_Scene;

})(Base_Scene);

/*
//@ sourceMappingURL=Scene.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Selection;

Timechart_Selection = (function() {
  "use strict";
  Timechart_Selection.prototype.animationPriority = 0;

  Timechart_Selection.prototype.chart = null;

  Timechart_Selection.prototype.selectStart = null;

  Timechart_Selection.prototype.selectingPointer = null;

  Timechart_Selection.prototype.isSelecting = false;

  Timechart_Selection.prototype.lastX = 0;

  Timechart_Selection.prototype.lastY = 0;

  Timechart_Selection.prototype.roundAround = false;

  function Timechart_Selection(chart) {
    this.chart = chart;
    this.scene = chart.scene;
  }

  Timechart_Selection.prototype.onSceneChange = function(event) {
    var en, st, _ref;
    if ((event.changes.time || event.changes.bounds) && (this.selectStart != null)) {
      event.x = this.lastX;
      event.y = this.lastY;
      event.identifier = this.selectingPointer;
      this.onPointerDrag(event);
    }
    if (event.changes.selection) {
      return _ref = this.snapSelection(), st = _ref[0], en = _ref[1], _ref;
    }
  };

  Timechart_Selection.prototype.paintScene = function(event) {
    var g, h, h2, leftText, rightText, textWidth, x0, xL, xR, y0, y1, y2;
    if (!(this.scene.selectionStart && this.scene.selectionEnd)) {
      return;
    }
    x0 = Math.round(this.scene.x0);
    y0 = Math.round(this.scene.y0);
    y1 = Math.round(y0 + this.scene.height);
    y2 = Math.round(y0 + this.scene.height + this.scene.timeAxisSize);
    xL = Math.round(this.scene.timeToX(this.scene.selectionStart));
    xR = Math.round(this.scene.timeToX(this.scene.selectionEnd));
    h = this.scene.height + this.scene.timeAxisSize;
    h2 = this.scene.timeAxisSize;
    leftText = moment(this.scene.selectionStart).utc().format(this.scene.minorTimeFormat);
    rightText = moment(this.scene.selectionEnd).utc().format(this.scene.minorTimeFormat);
    g = event.context;
    textWidth = g.measureText(leftText).width;
    Base_Graphics.pushClip(g, x0, y0, this.scene.width, h);
    g.beginPath();
    g.moveTo(xL, y0);
    g.lineTo(xL, y2);
    g.moveTo(xR, y0);
    g.lineTo(xR, y2);
    Base_Graphics.stroke(g, this.scene.settings.area.style.selection);
    Base_Graphics.rectStyle(g, this.scene.settings.area.style.selection);
    g.fillRect(xL, y0, xR - xL, h);
    Base_Graphics.textStyle(g, this.scene.settings.area.style.selectionLabel);
    g.textBaseline = "top";
    if (textWidth * 3.3 < xR - xL) {
      g.textAlign = "start";
      g.fillText(leftText, xL + 2, y0 + 2);
      g.textAlign = "end";
      g.fillText(rightText, xR - 2, y0 + 2);
    } else {
      g.textAlign = "end";
      g.fillText(leftText, xL - 2, y0 + 2);
      g.textAlign = "start";
      g.fillText(rightText, xR + 2, y0 + 2);
    }
    return Base_Graphics.popClip(g);
  };

  Timechart_Selection.prototype.onPointerMove = function(event) {
    var s0X, s1X;
    if (!this.scene.settings.interaction.selection.enabled) {
      return;
    }
    if (this.scene.xyInTimeBar(event.x, event.y)) {
      event.cursor = "text";
    }
    if (this.scene.selectionStart && this.scene.selectionEnd && this.scene.xyInChartOrTime(event.x, event.y) && this.scene.timeStart < this.scene.timeEnd) {
      s0X = this.scene.timeToX(this.scene.selectionStart);
      s1X = this.scene.timeToX(this.scene.selectionEnd);
      if (Math.abs(s1X - event.x) <= this.scene.settings.interaction.selection.grabThreshold) {
        event.cursor = "e-resize";
        return event.consumed = true;
      } else if (Math.abs(s0X - event.x) <= this.scene.settings.interaction.selection.grabThreshold) {
        event.cursor = "w-resize";
        return event.consumed = true;
      }
    }
  };

  Timechart_Selection.prototype.onPointerDown = function(event) {
    var s0X, s1X, x0, x1;
    if ((!this.scene.xyInChartOrTime(event.x, event.y)) || (this.selectingPointer != null) || (!this.scene.settings.interaction.selection.enabled)) {
      return;
    }
    this.lastX = event.x;
    this.lastY = event.y;
    if ((this.scene.selectionStart != null) || (this.scene.selectionEnd != null)) {
      x0 = this.scene.timeToX(this.scene.selectionStart);
      x1 = this.scene.timeToX(this.scene.selectionEnd);
      s0X = Math.abs(x0 - event.x);
      s1X = Math.abs(x1 - event.x);
      if (s0X < this.scene.settings.interaction.selection.grabThreshold && s0X <= s1X) {
        this.selectingPointer = event.identifier;
        this.selectStart = this.scene.selectionEnd;
        this.selectingPointer = event.identifier;
        event.consumed = true;
        this.roundAround = true;
        this.isSelecting = true;
        return;
      }
      if (s1X < this.scene.settings.interaction.selection.grabThreshold && s1X <= s0X) {
        this.selectStart = this.scene.selectionStart;
        this.selectingPointer = event.identifier;
        event.consumed = true;
        this.roundAround = true;
        this.isSelecting = true;
        return;
      }
    }
    if (this.scene.xyInTimeBar(event.x, event.y)) {
      this.selectingPointer = event.identifier;
      this.selectStart = this.scene.xToTime(event.x);
      this.roundAround = false;
      event.consumed = true;
      if (event.x >= x0 && event.x <= x1) {
        return this.isSelecting = false;
      } else {
        this.scene.selectionStart = null;
        this.scene.selectionEnd = null;
        event.changes.selection = true;
        return this.isSelecting = true;
      }
    }
  };

  Timechart_Selection.prototype.onPointerDrag = function(event) {
    var filling, t0, t1, time;
    if ((this.selectStart == null) || this.selectingPointer !== event.identifier) {
      return;
    }
    this.isSelecting = true;
    this.lastX = event.x;
    this.lastY = event.y;
    time = this.scene.xToTime(event.x);
    filling = Math.abs(this.selectStart - time);
    if (this.selectStart < time) {
      t0 = Math.max(this.selectStart - filling, this.scene.snapTimeDown(this.selectStart));
      t1 = time;
    } else {
      t0 = time;
      t1 = Math.min(this.selectStart + filling, this.scene.snapTimeUp(this.selectStart));
    }
    this.scene.selectionStart = t0;
    this.scene.selectionEnd = t1;
    event.changes.selection = true;
    return event.consumed = true;
  };

  Timechart_Selection.prototype.onPointerUp = function(event) {
    var en, st, _ref;
    if ((this.selectStart == null) || this.selectingPointer !== event.identifier) {
      return;
    }
    if (this.isSelecting) {
      _ref = this.snapSelection(), st = _ref[0], en = _ref[1];
      if (st === en) {
        st = null;
        en = null;
      }
      this.scene.selectionStart = st;
      this.scene.selectionEnd = en;
      this.chart.notifySelectionChanged("user");
      event.changes.selection = true;
    }
    this.selectStart = null;
    this.selectingPointer = null;
    return event.consumed = true;
  };

  Timechart_Selection.prototype.snapSelection = function() {
    var en, st;
    if (this.scene.selectionStart) {
      if (this.roundAround) {
        st = this.scene.snapTimeRound(this.scene.selectionStart);
        en = this.scene.snapTimeRound(this.scene.selectionEnd);
      } else {
        st = this.scene.snapTimeDown(this.scene.selectionStart);
        en = this.scene.snapTimeUp(this.scene.selectionEnd);
      }
    } else {
      st = null;
      en = null;
    }
    return [st, en];
  };

  return Timechart_Selection;

})();

/*
//@ sourceMappingURL=Selection.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Markers;

Timechart_Markers = (function() {
  "use strict";
  Timechart_Markers.prototype.scene = null;

  function Timechart_Markers(chart) {
    this.chart = chart;
    this.scene = this.chart.scene;
  }

  Timechart_Markers.prototype.paintScene = function(event) {
    var format, g, height, marker, text, w, x, x0, x1, y0, y1, yLabel, _i, _len, _ref;
    if (!(this.scene.markers.length > 0 && (this.scene.displayUnit != null))) {
      return;
    }
    x0 = this.scene.x0;
    x1 = x0 + this.scene.width;
    y0 = Math.round(this.scene.y0);
    height = this.scene.height;
    yLabel = Math.round(y0 + height + this.scene.timeAxisSize * 0.5);
    y1 = Math.round(y0 + height + this.scene.timeAxisSize);
    g = event.context;
    Base_Graphics.pushClip(g, x0, y0, this.scene.width, this.scene.height + this.scene.timeAxisSize);
    g.textBaseline = "middle";
    format = this.scene.settings.localization.markerDates.timeFormats[this.scene.displayUnit.unit];
    Base_Graphics.textStyle(g, this.scene.settings.area.style.markerText);
    _ref = this.scene.markers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      marker = _ref[_i];
      x = this.scene.timeToX(marker.time);
      if (!(x >= x0 && x <= x1)) {
        continue;
      }
      g.beginPath();
      g.moveTo(x, y0);
      g.lineTo(x, y1);
      Base_Graphics.stroke(g, marker.style);
      Base_Graphics.textStyle(g, marker.style);
      text = moment(marker.time).utc().format(format);
      w = g.measureText(text).width;
      if (x + w >= x1) {
        g.textAlign = "end";
        x -= 2;
      } else {
        g.textAlign = "start";
        x += 2;
      }
      g.fillText(text, x, yLabel);
    }
    return Base_Graphics.popClip(g);
  };

  return Timechart_Markers;

})();

/*
//@ sourceMappingURL=Markers.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Highlights;

Timechart_Highlights = (function() {
  "use strict";
  Timechart_Highlights.prototype.animationPriority = 9;

  Timechart_Highlights.prototype.scene = null;

  Timechart_Highlights.prototype.customId = 0;

  Timechart_Highlights.prototype.animating = false;

  Timechart_Highlights.prototype.highlights = {};

  function Timechart_Highlights(chart) {
    this.chart = chart;
    this.scene = chart.scene;
    this.highlights = {};
  }

  Timechart_Highlights.prototype.doAnimations = function(event) {
    var existingHighlights, k, m, mm, newAnimating, time, _i, _len, _ref, _ref1, _ref2, _ref3;
    if (event.changes.highlight) {
      existingHighlights = [];
      _ref = this.highlights;
      for (k in _ref) {
        m = _ref[k];
        m.mode = "exiting";
        if (m.origin.keepTrack === false) {
          delete this.highlights[k];
          existingHighlights.push(m);
        }
      }
      for (_i = 0, _len = existingHighlights.length; _i < _len; _i++) {
        m = existingHighlights[_i];
        this.highlights["__" + this.customId] = m;
        this.customId += 1;
      }
      _ref1 = this.scene.highlights;
      for (k in _ref1) {
        mm = _ref1[k];
        if (this.highlights[k] != null) {
          m = this.highlights[k];
          m.mode = null;
          m.from = mm.from;
          m.to = mm.to;
          if (m.style.fillColor !== mm.style.fillColor && mm.style.fadeCross > 0) {
            this.animating = true;
            m.animator = new Base_Animator(m.style.fillColor, mm.style.fillColor, mm.style.fadeCross, "=", event.time);
          } else {
            m.style = Base_Helpers.clone(mm.style);
          }
        } else {
          m = {
            from: mm.from,
            to: mm.to,
            style: Base_Helpers.clone(mm.style),
            origin: mm
          };
          this.highlights[k] = m;
          if (mm.style.fadeIn > 0) {
            this.animating = true;
            m.animator = new Base_Animator(Base_Graphics.deriveColor(m.style.fillColor, 1, 0), m.style.fillColor, m.style.fadeIn, "=", event.time);
          }
        }
      }
      _ref2 = this.highlights;
      for (k in _ref2) {
        m = _ref2[k];
        if (m.mode === "exiting") {
          mm = m.origin;
          if (mm.style.fadeOut > 0) {
            this.animating = true;
            m.animator = new Base_Animator(m.style.fillColor, Base_Graphics.deriveColor(m.style.fillColor, 1, 0), m.style.fadeOut, "=", event.time);
          } else {
            delete this.highlights[k];
          }
        }
      }
    }
    if (this.animating) {
      newAnimating = false;
      time = event.time;
      _ref3 = this.highlights;
      for (k in _ref3) {
        m = _ref3[k];
        if (m.animator != null) {
          m.style.fillColor = m.animator.getColor(time);
          if (m.animator.finished(time)) {
            m.animator = null;
            if (m.mode === "exiting") {
              delete this.highlights[k];
            }
          } else {
            newAnimating = true;
          }
        }
      }
      this.animating = newAnimating;
      return event.animating |= newAnimating;
    }
  };

  Timechart_Highlights.prototype.paintScene = function(event) {
    var g, height, highlight, hx0, hx1, k, x0, x1, y0, _ref, _results;
    if (!((this.scene.markers.length > 0 || this.scene.highlights.length > 0) && (this.scene.displayUnit != null))) {
      return;
    }
    x0 = this.scene.x0;
    x1 = x0 + this.scene.width;
    y0 = Math.round(this.scene.y0);
    height = this.scene.height;
    g = event.context;
    _ref = this.highlights;
    _results = [];
    for (k in _ref) {
      highlight = _ref[k];
      hx0 = Math.max(this.scene.timeToX(highlight.from), x0);
      hx1 = Math.min(this.scene.timeToX(highlight.to), x1);
      if (!(hx1 >= x0 && hx0 <= x1)) {
        continue;
      }
      Base_Graphics.rectStyle(g, highlight.style);
      _results.push(g.fillRect(hx0, y0, hx1 - hx0, height));
    }
    return _results;
  };

  return Timechart_Highlights;

})();

/*
//@ sourceMappingURL=Highlights.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_InfoPopup;

Timechart_InfoPopup = (function() {
  "use strict";
  Timechart_InfoPopup.prototype.animationPriority = 10;

  Timechart_InfoPopup.prototype.chart = null;

  Timechart_InfoPopup.prototype.container = null;

  Timechart_InfoPopup.prototype.scene = null;

  Timechart_InfoPopup.prototype.events = null;

  Timechart_InfoPopup.prototype.t0 = 0;

  Timechart_InfoPopup.prototype.t1 = 0;

  Timechart_InfoPopup.prototype.periodCount = 0;

  Timechart_InfoPopup.prototype.value = 0;

  Timechart_InfoPopup.prototype.text = null;

  Timechart_InfoPopup.prototype.popup = null;

  Timechart_InfoPopup.prototype.popupValue = null;

  Timechart_InfoPopup.prototype.popupDate = null;

  Timechart_InfoPopup.prototype.popupVisible = false;

  function Timechart_InfoPopup(chart) {
    this.chart = chart;
    this.container = chart.layers.container;
    this.scene = chart.scene;
    this.events = chart.events;
    this.popup = Base_Helpers.createDom("div", "TC-info-center", null, this.container);
    Base_Helpers.createDom("em", null, null, this.popup);
    this.chart.events.addWhiteList(this.popup);
    this.popup.style.position = "absolute";
    this.popup.style.display = "none";
  }

  Timechart_InfoPopup.prototype.doAnimations = function(event) {
    if (event.changes.time) {
      if (this.hideInfoPopup()) {
        event.changes.infoLabel = true;
        return event.changes.highlight = true;
      }
    } else if (event.changes.selection && (this.scene.selectionStart != null)) {
      if (this.showInfoPopup(this.scene.selectionStart, this.scene.y0)) {
        event.changes.infoLabel = true;
        return event.changes.highlight = true;
      }
    } else if (this.popup && (event.changes.time || event.changes.bounds)) {
      this.updateXY();
      event.changes.infoLabel = true;
      return event.changes.highlight = true;
    }
  };

  Timechart_InfoPopup.prototype.previewPointerDown = function(event) {
    return this.timeLineVisible = false;
  };

  Timechart_InfoPopup.prototype.previewPointerMove = function(event) {
    var t;
    if (!(this.scene.settings.info.enabled && this.scene.displayUnit)) {
      return;
    }
    if (this.scene.xyInChartOrTime(event.x, event.y)) {
      t = this.getInfoTime(event.x);
      this.showTimeLine(t, event);
      return this.showInfoPopup(t, event.y);
    } else {
      return this.previewPointerOut(event);
    }
  };

  Timechart_InfoPopup.prototype.previewPointerOut = function(event) {
    this.timeLineX = false;
    if ((this.popupVisible != null) && !Base_Helpers.isParentOf(this.popup, event.target)) {
      if (this.hideInfoPopup()) {
        event.changes.infoLabel = true;
        return event.changes.highlight = true;
      }
    }
  };

  Timechart_InfoPopup.prototype.hideInfoPopup = function() {
    if (!this.popupVisible) {
      return false;
    }
    this.popupVisible = false;
    this.popup.style.display = "none";
    this.scene.removeHighlight("infoRange");
    return true;
  };

  Timechart_InfoPopup.prototype.showInfoPopup = function(t, y) {
    var content, dataFrom, dataTo, g, t0, t1, _ref;
    g = this.scene.getClickRange(t, y);
    if (g == null) {
      return;
    }
    t0 = g[0], t1 = g[1], this.periodCount = g[2];
    if (!((t0 != null) && (t1 != null))) {
      return;
    }
    _ref = this.scene.getDataPeriod(false), dataFrom = _ref[0], dataTo = _ref[1];
    if (((dataFrom != null) && dataFrom >= t1) || ((dataTo != null) && dataTo <= t0)) {
      return this.hideInfoPopup();
    }
    if (this.popupVisible && t0 === this.t0 && t1 === this.t1 && this.timeLineX === this.popupX) {
      return false;
    }
    this.t0 = t0;
    this.t1 = t1;
    /*
    #
    # What we should do now is following:
    # 1) talk to Series (Active!)
    # 2) we have t0, t1 which are "indexes"?
    # 3) Now, Series have pre-aggregated values (avg/min/max etc)
    # 4) Now, we need to ask Series to either:
    # Min/Max for the range
    # First/Last for the range
    # Sum for the range
    # Avg for the range, StdDev?
    # Median for the range?
    #
    # We might also want to show different bits at once for Selection.
    #
    #
    # But for non-selection case, we ask to provide spot on values, that have
    # already been pre-acumulated. We use "Rows" data obviously, that contains
    # processed values for the rows, where rows represent each of "series",
    # even if it's stacked. This implies also that name shoud go in to config,
    # as that represents each "sub-series".
    #
    # So we do like this:
    #
    # @chart.renderer.each("series", "exportData", {from: ts, to: ts, agr: [
    #   "min", "max", "first", "last", "sum", "avg", "med", "stddev"
    # ]);
    #
    # we should collect output in each and send back as array
    # [[
    #   name: "seriesName",
    #   data: [
    #     {
    #       name: "subSeriesName",
    #       values: {
    #         min: min,
    #         max: max,
    #         ...
    #       },
    #       style: {
    #         strokeSyle: foo
    #         fillStyle: bar
    #         shape: {
    #             type: "romb|square|circle",
    #             fillStle: goo
    #         }
    #       }
    #     }
    #   ]
    # ], ...]
    #
    # Now, when we have all data for series and subseries, we can nicely
    # display stuff like this:
    #
    # --- Series 1 ----
    # | Bar: 4000     |
    # | Foo: 2000     |
    # -----------------
    #
    # --- Series 2 ----
    # | 4000          |
    # -----------------
    #
    # --- Series 3 ----------------------------------------------------------
    # | Foo: 4000(sum) 1000(min) 2000(max) 1000(open) 2000(close) 25(count) |
    # | Bar: 2000(sum) 100(min) 1000(max) 400(open) 2000(close) 10 (count)  |
    # -----------------------------------------------------------------------
    #
    #
    */

    this.info = this.chart.renderer.exportData(t0, t1);
    if (this.periodCount > 1) {
      this.scene.setHighlight("infoRange", t0, t1, this.scene.settings.info.style.highlight);
    } else {
      this.scene.removeHighlight("infoRange");
    }
    content = this.buildContent(this.scene.displayUnit, t0, t1, this.info);
    this.popup.innerHTML = content;
    this.events.notifySceneChanges({
      infoLabel: true,
      highlight: true
    });
    if (!this.popupVisible) {
      this.popup.style.display = "block";
      this.popupVisible = true;
    }
    this.updateXY();
    return true;
  };

  Timechart_InfoPopup.prototype.getInfoTime = function(x) {
    var t, unit;
    if (this.scene.settings.info.snap) {
      t = this.scene.xToTime(x);
      unit = this.scene.displayUnit;
      return (unit.roundTimeDown(t) + unit.roundTimeUp(t)) / 2;
    } else {
      return this.scene.xToTime(x);
    }
  };

  Timechart_InfoPopup.prototype.showTimeLine = function(t, event) {
    var x;
    x = this.scene.timeToX(t);
    this.timeLineVisible = true;
    if (x !== this.timeLineX) {
      event.changes.timeline = true;
      return this.timeLineX = x;
    }
  };

  Timechart_InfoPopup.prototype.hideTimeLine = function() {
    return this.timeLineVisible = false;
  };

  Timechart_InfoPopup.prototype.paintScene = function(event) {
    var context, t, x1, x2;
    if (this.scene.selectionStart) {
      x1 = this.scene.timeToX(this.scene.selectionStart);
    }
    if (this.scene.selectionEnd) {
      x2 = this.scene.timeToX(this.scene.selectionEnd);
    }
    if (this.timeLineX === false || (this.timeLineX >= x1 && this.timeLineX <= x2) || !this.timeLineVisible) {
      return;
    }
    context = event.context;
    if (this.scene.settings.info.crosshair) {
      context.beginPath();
      context.moveTo(this.timeLineX, this.chart.scene.y0);
      context.lineTo(this.timeLineX, this.chart.scene.y0 + this.chart.scene.height + 100);
      Base_Graphics.stroke(context, this.scene.settings.info.style.crosshair);
    }
    if (!this.popupVisible) {
      t = this.scene.xToTime(this.timeLineX);
      this.showInfoPopup(t, event.y);
    }
    return this.updateXY();
  };

  Timechart_InfoPopup.prototype.updateXY = function() {
    var arrowWidth, cl, h, margin, w, x, x0, y;
    margin = 12;
    arrowWidth = 10;
    x0 = Math.max(this.scene.x0, this.timeLineX);
    x0 = Math.min(this.scene.width + this.scene.x0, this.timeLineX);
    y = this.scene.y0;
    cl = "TC-info-center";
    w = this.popup.offsetWidth;
    h = this.popup.offsetHeight;
    if (x0 + w > this.scene.x0 + this.scene.width + arrowWidth) {
      x = x0 - w - arrowWidth;
      cl = "TC-info-left";
    } else {
      x = x0 + arrowWidth;
      cl = "TC-info-right";
    }
    if (this.periodCount > 1) {
      y = 0;
    }
    y = Math.min(Math.max(this.scene.y0 + margin, y - h / 2), this.scene.y0 + this.scene.height - h);
    this.popupX = x;
    this.popupY = y;
    this.popup.style.left = x + "px";
    this.popup.style.top = y + "px";
    return Base_Helpers.setClass(this.popup, cl);
  };

  Timechart_InfoPopup.prototype.buildContent = function(unit, t0, t1, info) {
    var biggerUnit, count, date, dateHtml, from, o, t0m, t1m, to, top, unitName, valueHtml;
    count = Math.ceil(unit.numberOfUnits(t0, t1)) * unit.count;
    unitName = count === 1 ? this.scene.settings.localization.timeUnitsNames[unit.unit] : this.scene.settings.localization.timeUnitsNamesPlural[unit.unit];
    if (count === 1) {
      t0m = moment(t0).utc();
      date = t0m.format(this.scene.settings.localization.infoDates.fullTimeFormats[unit.unit]);
      dateHtml = "" + date;
    } else {
      if (unit.unit === "d" || unit.unit === "M" || unit.unit === "y" || unit.unit === "ms") {
        t1 -= 1;
      }
      t0m = moment(t0).utc();
      t1m = moment(t1).utc();
      biggerUnit = unit.getBigger() || unit;
      if (biggerUnit.roundTimeDown(t0) === biggerUnit.roundTimeDown(t1)) {
        top = t0m.format(this.scene.settings.localization.infoDates.majorTimeFormats[unit.unit]);
        from = t0m.format(this.scene.settings.localization.infoDates.minorTimeFormats[unit.unit]);
        to = t1m.format(this.scene.settings.localization.infoDates.minorTimeFormats[unit.unit]);
        dateHtml = "" + from + " - " + to + " " + top;
      } else {
        from = t0m.format(this.scene.settings.localization.infoDates.fullTimeFormats[unit.unit]);
        to = t1m.format(this.scene.settings.localization.infoDates.fullTimeFormats[unit.unit]);
        dateHtml = "" + from + " - " + to;
      }
    }
    valueHtml = this.buildValues(info);
    o = "<em></em><strong>" + dateHtml + ("<small>(" + count + " " + unitName + ")</small></strong>");
    o += valueHtml;
    return o;
  };

  Timechart_InfoPopup.prototype.buildValues = function(info) {
    /*
    #this method will build actual list, based on the info aggregated from the
    #series
    */

    var color, group, out, param, series, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    out = "";
    for (_i = 0, _len = info.length; _i < _len; _i++) {
      group = info[_i];
      if (group.name && group.data.length > 1) {
        out += "<h3>" + group.name + "</h3>";
      }
      out += "<table cellspacing=\"0\">";
      _ref = group.data;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        series = _ref[_j];
        out += "<tr><td";
        color = series.config.style.lineColor || series.config.style.fillColor;
        if (color) {
          out += " style=\"color: " + color + "\"";
        }
        out += "> " + (series.name || group.name) + "</td>";
        if (!series.values) {
          out += "<td>No data</td>";
        } else if (series.values.count > 1 && this.scene.settings.info.aggregations && this.scene.settings.info.aggregations.length > 0) {
          _ref1 = this.scene.settings.info.aggregations;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            param = _ref1[_k];
            out += "<td>" + param + "</td><td>" + series.values[param] + "</td>";
          }
        } else {
          out += "<td>" + series.values.sum + "</td>";
        }
        out += "</tr>";
      }
      out += "</table>";
    }
    return out;
  };

  return Timechart_InfoPopup;

})();

/*
//@ sourceMappingURL=InfoPopup.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_ClickNotifier;

Timechart_ClickNotifier = (function() {
  "use strict";
  Timechart_ClickNotifier.prototype.animationPriority = 0;

  Timechart_ClickNotifier.prototype.chart = null;

  Timechart_ClickNotifier.prototype.scene = null;

  Timechart_ClickNotifier.prototype.pointer = null;

  function Timechart_ClickNotifier(chart) {
    this.chart = chart;
    this.scene = this.chart.scene;
  }

  Timechart_ClickNotifier.prototype.previewPointerMove = function(event) {
    return this.pointer = null;
  };

  Timechart_ClickNotifier.prototype.previewPointerDown = function(event) {
    return this.pointer = event.identifier;
  };

  Timechart_ClickNotifier.prototype.onClick = function(event) {
    var range, t;
    if (event.identifier === this.pointer) {
      range = this.getClickRange(event.x, event.y);
      if (range != null) {
        t = this.scene.xToTime(event.x);
        if ((this.scene.selectionStart != null) && (this.scene.selectionStart > t || this.scene.selectionEnd < t)) {
          this.scene.selectionStart = null;
          this.scene.selectionEnd = null;
          this.chart.notifySelectionChanged("user");
          event.changes.selection = true;
          return event.consumed = true;
        } else {
          event.clickStart = range[0];
          event.clickEnd = range[1];
          this.chart.notifyClick(event);
          return event.consumed = true;
        }
      }
    }
  };

  Timechart_ClickNotifier.prototype.onDoubleClick = function(event) {
    var range;
    range = this.getClickRange(event.x, event.y);
    if (range != null) {
      event.clickStart = range[0];
      event.clickEnd = range[1];
      this.chart.notifyDoubleClick(event);
      return event.consumed = true;
    }
  };

  Timechart_ClickNotifier.prototype.getClickRange = function(x, y) {
    if (!this.scene.xyInChartOrTime(x, y)) {
      return null;
    }
    return this.scene.getClickRange(this.scene.xToTime(x), y);
  };

  return Timechart_ClickNotifier;

})();

/*
//@ sourceMappingURL=ClickNotifier.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_TimeUpdater,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Timechart_TimeUpdater = (function() {
  "use strict";
  function Timechart_TimeUpdater(chart) {
    this.chart = chart;
    this.dataTick = __bind(this.dataTick, this);
    this.timerTick = __bind(this.timerTick, this);
    this.animationPriority = 1050;
    this.settings = this.chart.settings;
    this.scene = this.chart.scene;
    this.events = this.chart.events;
    if (this.settings.advanced.timeUpdateInterval) {
      setTimeout(this.timerTick, this.settings.advanced.timeUpdateInterval);
    }
    if (this.settings.advanced.dataUpdateInterval) {
      setTimeout(this.dataTick, this.settings.advanced.dataUpdateInterval);
    }
  }

  Timechart_TimeUpdater.prototype.doAnimations = function(event) {
    this.updateCurTime();
    if (event.changes.data) {
      return this.updateVisiblePeriod();
    }
  };

  Timechart_TimeUpdater.prototype.timerTick = function() {
    if (this.chart.removed) {
      return;
    }
    this.chart.updateSize();
    if (this.updateCurTime()) {
      this.events.notifySceneChanges({
        markers: true
      });
    }
    this.updateVisiblePeriod();
    return setTimeout(this.timerTick, this.settings.advanced.timeUpdateInterval);
  };

  Timechart_TimeUpdater.prototype.updateVisiblePeriod = function() {
    var curTime, dt, latestDataTime, timeEnd, timeStart, unit;
    if (!(this.scene.displayUnit && (this.scene.timeEnd != null))) {
      return;
    }
    curTime = this.scene.getCurTime();
    latestDataTime = this.scene.getDataPeriod(false)[1];
    timeEnd = this.scene.timeEnd;
    timeStart = this.scene.timeStart;
    if (this.scene.anchor === "now" && timeEnd < curTime) {
      unit = this.scene.displayUnit;
      dt = unit.roundTimeUp(curTime) - timeEnd;
      this.chart.scrolling.setTimeRangeSnap(timeStart + dt, timeEnd + dt, timeEnd + dt, this.scene.displayUnit, true, "timer", true, false);
    }
    if (this.scene.anchor === "newestData" && timeEnd < latestDataTime) {
      unit = this.scene.displayUnit;
      dt = unit.roundTimeUp(latestDataTime) - timeEnd;
      return this.chart.scrolling.setTimeRangeSnap(timeStart + dt, timeEnd + dt, timeEnd + dt, this.scene.displayUnit, true, "timer", true, false);
    }
  };

  Timechart_TimeUpdater.prototype.updateCurTime = function() {
    var curTime;
    if (this.settings.area.currentTimeMarker == null) {
      return false;
    }
    curTime = this.scene.getCurTime();
    this.scene.markers[0].time = curTime;
    return this.scene.timeStart <= curTime && this.scene.timeEnd >= curTime;
  };

  Timechart_TimeUpdater.prototype.dataTick = function() {
    var callback, curTime,
      _this = this;
    if (this.chart.removed) {
      return;
    }
    curTime = this.scene.getCurTime();
    callback = function() {
      _this.updateVisiblePeriod();
      return _this.events.notifySceneChanges({
        data: true
      });
    };
    this.scene.data.updateData(this.scene.displayUnit.unit, curTime, callback);
    return setTimeout(this.dataTick, this.settings.advanced.dataUpdateInterval);
  };

  return Timechart_TimeUpdater;

})();

/*
//@ sourceMappingURL=TimeUpdater.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_TimeSlicer;

Timechart_TimeSlicer = (function() {
  Timechart_TimeSlicer.prototype.scene = null;

  Timechart_TimeSlicer.prototype.step = null;

  Timechart_TimeSlicer.prototype.uniform = false;

  Timechart_TimeSlicer.prototype.currentFrom = 0;

  Timechart_TimeSlicer.prototype.currentTo = 0;

  Timechart_TimeSlicer.prototype.fromBar = null;

  Timechart_TimeSlicer.prototype.toBar = null;

  Timechart_TimeSlicer.prototype.fromIndex = 0;

  Timechart_TimeSlicer.prototype.toIndex = 0;

  Timechart_TimeSlicer.prototype.times = [];

  Timechart_TimeSlicer.prototype.xes = [];

  Timechart_TimeSlicer.prototype.oldMul = 0;

  Timechart_TimeSlicer.prototype.oldAdd = 0;

  Timechart_TimeSlicer.prototype.arrays = [];

  Timechart_TimeSlicer.prototype.extraArrays = [];

  Timechart_TimeSlicer.prototype.bufExpandSize = 100;

  Timechart_TimeSlicer.prototype.extraSteps = 1;

  Timechart_TimeSlicer.prototype.uniformTolerance = 0;

  Timechart_TimeSlicer.prototype.approxExtraTime = 0;

  function Timechart_TimeSlicer(scene, step, arrays, from, to, uniform) {
    this.scene = scene;
    this.step = step;
    if (arrays == null) {
      arrays = [];
    }
    this.uniform = uniform != null ? uniform : true;
    from = from | this.scene.timeStart;
    to = to | this.scene.timeEnd;
    this.extraArrays = arrays.slice(0);
    this.arrays = arrays.slice(0);
    this.arrays.push("xes");
    this.arrays.push("times");
    this.uniformTolerance = Math.min(1, this.step.count - 2);
    this.approxExtraTime = this.extraSteps * step.approxTime();
    this.init(from - this.approxExtraTime, to + this.approxExtraTime);
  }

  Timechart_TimeSlicer.prototype._getOrigin = function(from) {
    var t0, unitsToAdd;
    if (this.step.count === 1 || this.uniform) {
      return this.step.roundTimeDown(from);
    }
    t0 = this.step.getBigger().roundTimeDown(from);
    unitsToAdd = this.step.numberOfUnits(t0, from);
    return this.step.add(t0, unitsToAdd);
  };

  Timechart_TimeSlicer.prototype._add = function(m) {
    var date, dim;
    if (this.uniform || this.step.count === 1 || this.step.unit !== "d") {
      return m.add(this.step.unit, this.step.count);
    } else {
      dim = m.daysInMonth();
      date = m.date();
      if (date + this.step.count * 2 > dim + 1 + this.uniformTolerance) {
        return m.add("d", dim - date + 1);
      } else {
        return m.add(this.step.unit, this.step.count);
      }
    }
  };

  Timechart_TimeSlicer.prototype._sub = function(m) {
    var date, dim, targetDay;
    if (this.uniform || this.step.count === 1 || this.step.unit !== "d") {
      return m.subtract(this.step.unit, this.step.count);
    } else {
      date = m.date();
      if (date <= this.step.count) {
        m.subtract("M", 1);
        dim = m.daysInMonth() - 1;
        targetDay = dim + 1 - this.step.count + this.uniformTolerance;
        return m.date(1 + targetDay - ((targetDay % this.step.count) | 0));
      } else {
        return m.subtract(this.step.unit, this.step.count);
      }
    }
  };

  Timechart_TimeSlicer.prototype.init = function(from, to) {
    var a, arr, t, x, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = this.arrays;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      this[a] = [];
    }
    if (from >= to) {
      this.fromIndex = 0;
      this.toIndex = 0;
      this.fromBar = null;
      this.toBar = null;
      return;
    }
    this.fromBar = moment(this._getOrigin(from)).utc();
    this.fromIndex = 0;
    t = moment(this.fromBar).utc();
    this.times.push(t.valueOf());
    while (t.valueOf() < to) {
      this._add(t);
      this.times.push(t.valueOf());
    }
    this.toIndex = this.times.length;
    this.toBar = t;
    this.currentFrom = from;
    this.currentTo = to;
    this.xes = (function() {
      var _j, _len1, _ref1, _results;
      _ref1 = this.times;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        t = _ref1[_j];
        _results.push(this.scene.timeToX(t));
      }
      return _results;
    }).call(this);
    _ref1 = this.extraArrays;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      arr = _ref1[_j];
      x = [];
      x.length = this.times.length;
      _results.push(this[arr] = x);
    }
    return _results;
  };

  Timechart_TimeSlicer.prototype.makeMiniSlice = function(time) {
    var m, t0, t1, tadd, tmul, x0, x1, _ref;
    _ref = this.scene.timeToXCoefs(), tadd = _ref[0], tmul = _ref[1];
    m = moment(this._getOrigin(time)).utc();
    t0 = m.valueOf();
    x0 = tadd + t0 * tmul;
    this._add(m);
    t1 = m.valueOf();
    x1 = tadd + t1 * tmul;
    return [t0, x0, t1, x1];
  };

  Timechart_TimeSlicer.prototype.update = function(from, to) {
    var a, arr, count, dfrom, ds, dto, l, newAfter, newBefore, offset, remove, t, tadd, tmul, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
    if (from == null) {
      from = this.scene.timeStart;
    }
    if (to == null) {
      to = this.scene.timeEnd;
    }
    /*
      Returns [offset, newBefore, newAfter].
      Data needs to be shifted by offset.
      Values [fromIndex..newBefore) and [newAfter..toIndex) are
      new and need updating.
    */

    from -= this.approxExtraTime;
    to += this.approxExtraTime;
    if (from === this.currentFrom && to === this.currentTo) {
      this.updateXes(this.fromIndex, this.toIndex);
      return [0, this.fromIndex, this.toIndex];
    }
    if (this.fromBar === null || from > this.toBar.valueOf() || to < this.fromBar.valueOf()) {
      this.init(from, to);
      return [0, this.toIndex, this.toIndex];
    }
    offset = 0;
    newBefore = this.fromIndex;
    newAfter = this.toIndex;
    _ref = this.scene.timeToXCoefs(), tadd = _ref[0], tmul = _ref[1];
    dfrom = this.fromBar.valueOf() - from;
    if (dfrom > 0) {
      count = ((dfrom / this.step.approxTime()) | 0) + 2;
      if (this.fromIndex < count) {
        a = [];
        a.length = count + this.bufExpandSize;
        _ref1 = this.arrays;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          arr = _ref1[_i];
          this[arr] = a.concat(this[arr]);
        }
        offset + a.length;
        newBefore += a.length;
        newAfter += a.length;
        this.fromIndex += a.length;
        this.toIndex += a.length;
      }
      t = this.fromBar.valueOf();
      while (t > from) {
        this._sub(this.fromBar);
        this.fromIndex -= 1;
        t = this.fromBar.valueOf();
        this.times[this.fromIndex] = t;
        this.xes[this.fromIndex] = tadd + t * tmul;
      }
    }
    dto = to - this.toBar.valueOf();
    if (dto > 0) {
      count = ((dto / this.step.approxTime()) | 0) + 2;
      if (this.times.length < this.toIndex + count) {
        l = this.toIndex + count + this.bufExpandSize;
        _ref2 = this.arrays;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          arr = _ref2[_j];
          this[arr].length = l;
        }
      }
      t = this.toBar.valueOf();
      while (t < to) {
        this._add(this.toBar);
        t = this.toBar.valueOf();
        this.times[this.toIndex] = t;
        this.xes[this.toIndex] = tadd + t * tmul;
        this.toIndex += 1;
      }
    }
    this._add(this.fromBar);
    while (this.fromBar.valueOf() < from) {
      this.fromIndex += 1;
      this._add(this.fromBar);
    }
    this._sub(this.fromBar);
    this._sub(this.toBar);
    while (this.toBar.valueOf() >= to) {
      this.toIndex -= 1;
      this._sub(this.toBar);
    }
    this._add(this.toBar);
    ds = this.toIndex - this.fromIndex + this.bufExpandSize;
    if (this.fromIndex > ds) {
      remove = this.fromIndex - this.bufExpandSize;
      _ref3 = this.arrays;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        arr = _ref3[_k];
        this[arr].splice(0, remove);
      }
      offset -= remove;
      newBefore -= remove;
      newAfter -= remove;
      this.fromIndex -= remove;
      this.toIndex -= remove;
    }
    if (this.toIndex < this.times.length - ds) {
      _ref4 = this.arrays;
      for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
        arr = _ref4[_l];
        this[arr].length = this.toIndex + this.bufExpandSize;
      }
    }
    this.updateXes(newBefore, newAfter);
    this.currentFrom = from;
    this.currentTo = to;
    return [offset, newBefore, newAfter];
  };

  Timechart_TimeSlicer.prototype.updateXes = function(newBefore, newAfter) {
    var i, tadd, tmul, _i, _ref, _ref1, _results;
    _ref = this.scene.timeToXCoefs(), tadd = _ref[0], tmul = _ref[1];
    if (this.oldAdd !== tadd || this.oldMul !== tmul) {
      this.oldAdd = tadd;
      this.oldMul = tmul;
      _results = [];
      for (i = _i = newBefore, _ref1 = newAfter - 1; _i <= _ref1; i = _i += 1) {
        _results.push(this.xes[i] = tadd + this.times[i] * tmul);
      }
      return _results;
    }
  };

  return Timechart_TimeSlicer;

})();

/*
//@ sourceMappingURL=TimeSlicer.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_TimeAxis;

Timechart_TimeAxis = (function() {
  "use strict";
  Timechart_TimeAxis.prototype.renderer = null;

  Timechart_TimeAxis.prototype.scene = null;

  Timechart_TimeAxis.prototype.context = null;

  Timechart_TimeAxis.prototype.tt = null;

  Timechart_TimeAxis.prototype.curSceneScale = 0;

  Timechart_TimeAxis.prototype.minorFormat = null;

  Timechart_TimeAxis.prototype.majorFormat = null;

  Timechart_TimeAxis.prototype.minorTimeUnit = null;

  Timechart_TimeAxis.prototype.majorTimeUnit = null;

  Timechart_TimeAxis.prototype.minorLabelHeight = null;

  Timechart_TimeAxis.prototype.majorLabelHeight = null;

  Timechart_TimeAxis.prototype.minorLabelWidths = null;

  Timechart_TimeAxis.prototype.minorLabelBallonWidths = null;

  Timechart_TimeAxis.prototype.majorLabelWidths = null;

  Timechart_TimeAxis.prototype.majorSlices = null;

  Timechart_TimeAxis.prototype.minorSlices = null;

  function Timechart_TimeAxis(renderer) {
    this.renderer = renderer;
    this.scene = this.renderer.scene;
    this.tt = new Timechart_TimeSetup(this.renderer.scene);
    this.options = this.scene.settings.timeAxis;
  }

  /*
    Called only once to precompute text sizes from font sizes and text formats
  */


  Timechart_TimeAxis.prototype.computeTextSizes = function(g) {
    var unit, w, widestTime, _i, _j, _len, _len1, _ref, _ref1;
    widestTime = moment(218342562955000).utc();
    g.save();
    Base_Graphics.textStyle(g, this.scene.settings.timeAxis.style.minorTimeLabel);
    this.minorLabelHeight = g.measureText("M").width;
    this.minorLabelWidths = {};
    this.minorLabelBallonWidths = {};
    _ref = Base_TimeStep.knownUnits;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      unit = _ref[_i];
      w = g.measureText(widestTime.format(this.scene.settings.localization.timeAxisDates.minorLabelTimeFormats[unit])).width;
      this.minorLabelWidths[unit] = w;
      this.minorLabelBallonWidths[unit] = w + this.minorLabelHeight * 1.2;
    }
    Base_Graphics.textStyle(g, this.scene.settings.timeAxis.style.majorTimeLabel);
    this.majorLabelHeight = g.measureText("M").width;
    this.majorLabelWidths = {};
    _ref1 = Base_TimeStep.knownUnits;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      unit = _ref1[_j];
      this.majorLabelWidths[unit] = g.measureText(widestTime.format(this.scene.settings.localization.timeAxisDates.majorLabelTimeFormats[unit])).width + this.majorLabelHeight;
    }
    return g.restore();
  };

  Timechart_TimeAxis.prototype.multiples = {
    s: [1, 2, 5, 15, 30],
    m: [1, 2, 5, 15, 30],
    h: [1, 3, 6, 12, 24],
    d: [1, 2, 5, 10],
    w: [1, 5, 10, 20],
    M: [1, 3, 6],
    y: [1, 10, 100, 1000]
  };

  /*
    Called whenever time scale cahanges
  */


  Timechart_TimeAxis.prototype.computeLabels = function(displayUnit) {
    var baseUnit, chartDt, m, majorUnit, minorUnit, nextUnit, s, unit, unitDt, unitSpacing, yearDt, _i, _j, _len, _len1, _ref, _ref1;
    s = new Timechart_TimeSetup(this.scene.settings);
    chartDt = this.scene.timeEnd - this.scene.timeStart;
    nextUnit = s.toBiggerDisplayPeriod(displayUnit);
    if (nextUnit != null) {
      baseUnit = new Base_TimeStep("s", 1);
      if (nextUnit.isSmaller(baseUnit)) {
        nextUnit = baseUnit;
      }
      unit = null;
      while (((unit == null) && (nextUnit != null)) || ((nextUnit != null) && nextUnit.approxTime() <= chartDt * 0.5) || ((unit != null) && (nextUnit != null) && unit.approxTime() < this.scene.dxToDtime(this.majorLabelWidths[unit.unit]))) {
        unit = nextUnit;
        nextUnit = s.toBiggerDisplayPeriod(nextUnit);
      }
    }
    if (nextUnit == null) {
      yearDt = this.scene.dxToDtime(this.majorLabelWidths["y"]);
      unit = displayUnit.unit === "y" ? displayUnit : new Base_TimeStep("y", 1);
      _ref = this.multiples["y"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        unit = new Base_TimeStep("y", m);
        if (unit.approxTime() > yearDt) {
          break;
        }
      }
    }
    majorUnit = unit;
    minorUnit = null;
    if (displayUnit.unit !== "y") {
      unit = this.scene.displayUnit.clone();
      unitDt = unit.approxTime();
      unitSpacing = this.scene.dxToDtime(this.minorLabelWidths[unit.unit]) * 1.5;
      _ref1 = this.multiples[unit.unit];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        m = _ref1[_j];
        if (m < unit.count) {
          m = unit.count;
        }
        unit.count = m;
        unitDt = unit.approxTime();
        if (unitSpacing <= unitDt) {
          minorUnit = unit;
          break;
        }
      }
    }
    return [minorUnit, majorUnit];
  };

  Timechart_TimeAxis.prototype.paint = function(g) {
    var barSlices, counter, fiMajor, fromIndex, height, i, iMajor, isEven, ly0, ly1, lytext, maI, maI0, maX, majorStep, miI, miI0, miX, minorStep, num, sceneScale, t, text, textWidth, textX, textY, tiMajor, times, toIndex, tx0, tx1, ty0, ty1, x, x0, x1, xMajor, xa, xb, xes, xinc, y0, y00, y1, yMajor, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    if (!(this.scene.settings.timeAxis.enabled && (this.scene.timeStart < this.scene.timeEnd))) {
      return;
    }
    if (this.minorLabelHeight === null) {
      this.computeTextSizes(g);
    }
    x0 = this.scene.x0;
    y00 = this.scene.y0;
    y0 = y00 + this.scene.height + 1;
    height = this.scene.timeAxisSize;
    y1 = y0 + height;
    x1 = x0 + this.scene.width;
    yMajor = y1 - this.majorLabelHeight * 1.8;
    Base_Graphics.pushClip(g, x0, y00, this.scene.width, height + this.scene.height);
    sceneScale = this.scene.getScale();
    if (!(Math.abs(1 - this.curSceneScale / sceneScale) < 0.001)) {
      this.curSceneScale = sceneScale;
      _ref = this.computeLabels(this.scene.displayUnit), minorStep = _ref[0], majorStep = _ref[1];
      this.minorFormat = minorStep != null ? this.scene.settings.localization.timeAxisDates.minorLabelTimeFormats[minorStep.unit] : null;
      this.majorFormat = this.scene.settings.localization.timeAxisDates.majorLabelTimeFormats[majorStep.unit];
      this.minorTimeUnit = minorStep;
      this.majorTimeUnit = majorStep;
      if (this.majorSlices === null || majorStep.approxTime() !== this.majorSlices.step.approxTime()) {
        this.majorSlices = new Timechart_TimeSlicer(this.scene, majorStep);
      }
      if ((minorStep != null) && (this.minorSlices === null || minorStep.approxTime() !== this.minorSlices.step.approxTime())) {
        this.minorSlices = new Timechart_TimeSlicer(this.scene, minorStep, [], null, null, false);
      } else if (minorStep === null) {
        this.minorSlices = null;
      }
    }
    this.majorSlices.update();
    xes = this.majorSlices.xes;
    times = this.majorSlices.times;
    fromIndex = this.majorSlices.fromIndex;
    toIndex = this.majorSlices.toIndex;
    num = this.majorSlices.step.numberOfUnits(0, times[fromIndex]);
    isEven = (num | 0) % 2 === 0;
    g.beginPath();
    for (i = _i = fromIndex, _ref1 = toIndex - 2; _i <= _ref1; i = _i += 1) {
      isEven = !isEven;
      if (isEven) {
        continue;
      }
      xa = (Math.max(xes[i], x0) | 0) + 1;
      xb = Math.min(xes[i + 1], x1) | 0;
      g.rect(xa, y0, xb - xa, height);
    }
    Base_Graphics.fill(g, this.scene.settings.timeAxis.style.dateLighten);
    if (this.options.vgrid) {
      g.beginPath();
      for (i = _j = _ref2 = fromIndex + 1, _ref3 = toIndex - 2; _j <= _ref3; i = _j += 1) {
        x = (xes[i] | 0) + 0.5;
        if (x >= x1) {
          break;
        }
        g.moveTo(x, y00);
        g.lineTo(x, y1);
      }
      Base_Graphics.stroke(g, this.options.style.vgrid);
    }
    textWidth = this.majorLabelWidths[this.majorSlices.step.unit];
    if (this.scene.settings.timeAxis.style.showMajorTimeBalloons) {
      g.beginPath();
      for (i = _k = fromIndex, _ref4 = toIndex - 2; _k <= _ref4; i = _k += 1) {
        tx0 = xes[i];
        tx1 = xes[i + 1];
        if (tx0 >= x1 || tx1 <= x0) {
          continue;
        }
        t = times[i];
        textX = (tx0 + tx1) / 2;
        if (tx0 < x0) {
          tx0 = x0;
          textX = Math.min((tx0 + tx1) / 2, tx1 - textWidth);
        }
        if (tx1 > x1) {
          tx1 = x1;
          textX = Math.max((tx0 + tx1) / 2, tx0 + textWidth);
        }
        this.paintTimeBallon2(g, textX, yMajor + 1, textWidth, this.majorLabelHeight);
      }
      Base_Graphics.paint(g, this.scene.settings.timeAxis.style.majorTimeBalloonStyle);
    }
    Base_Graphics.textStyle(g, this.scene.settings.timeAxis.style.majorTimeLabel);
    g.textAlign = "center";
    g.textBaseline = "middle";
    for (i = _l = fromIndex, _ref5 = toIndex - 2; _l <= _ref5; i = _l += 1) {
      tx0 = xes[i];
      tx1 = xes[i + 1];
      if (tx0 >= x1 || tx1 <= x0) {
        continue;
      }
      t = times[i];
      text = moment(t).utc().format(this.majorFormat);
      textX = (tx0 + tx1) / 2;
      if (tx0 < x0) {
        tx0 = x0;
        textX = Math.min((tx0 + tx1) / 2, tx1 - textWidth);
      }
      if (tx1 > x1) {
        tx1 = x1;
        textX = Math.max((tx0 + tx1) / 2, tx0 + textWidth);
      }
      g.fillText(text, textX, yMajor);
    }
    if (this.minorSlices) {
      this.minorSlices.update();
      times = this.minorSlices.times;
      xes = this.minorSlices.xes;
      fromIndex = this.minorSlices.fromIndex;
      toIndex = this.minorSlices.toIndex;
      textWidth = this.minorLabelWidths[this.minorSlices.step.unit];
      lytext = y0 + (this.minorLabelHeight * 0.4) | 0;
      ly0 = y0 - 1;
      ly1 = lytext + (this.minorLabelHeight * 1.6) | 0;
      if (this.scene.settings.timeAxis.style.showMinorTimeBalloons) {
        g.beginPath();
        textY = null;
        for (i = _m = fromIndex, _ref6 = toIndex - 1; _m <= _ref6; i = _m += 1) {
          x = xes[i];
          textY = this.paintTimeBallon(g, x, y0 - 5, textWidth, this.minorLabelHeight);
        }
        Base_Graphics.paint(g, this.scene.settings.timeAxis.style.minorTimeBalloonStyle);
      } else {
        fiMajor = this.majorSlices.fromIndex;
        tiMajor = this.majorSlices.toIndex;
        xMajor = this.majorSlices.xes;
        g.beginPath();
        iMajor = fiMajor;
        for (i = _n = fromIndex, _ref7 = toIndex - 1; _n <= _ref7; i = _n += 1) {
          x = xes[i];
          while (x > xMajor[iMajor]) {
            iMajor += 1;
          }
          if (xMajor[iMajor] === x) {
            continue;
          }
          if (x >= x1) {
            break;
          }
          x = (x | 0) - 0.5;
          g.moveTo(x, ly0);
          g.lineTo(x, ly1);
        }
        Base_Graphics.stroke(g, this.scene.settings.timeAxis.style.minorTimeRuler1);
        g.beginPath();
        iMajor = fiMajor;
        for (i = _o = fromIndex, _ref8 = toIndex - 1; _o <= _ref8; i = _o += 1) {
          x = xes[i];
          while (x > xMajor[iMajor]) {
            iMajor += 1;
          }
          if (xMajor[iMajor] === x) {
            continue;
          }
          if (x >= x1) {
            break;
          }
          x = (x | 0) + 0.5;
          g.moveTo(x, ly0);
          g.lineTo(x, ly1);
        }
        Base_Graphics.stroke(g, this.scene.settings.timeAxis.style.minorTimeRuler2);
      }
      Base_Graphics.textStyle(g, this.scene.settings.timeAxis.style.minorTimeLabel);
      g.textAlign = this.scene.settings.timeAxis.style.showMinorTimeBalloons ? "center" : "left";
      xinc = this.scene.settings.timeAxis.style.showMinorTimeBalloons ? 0 : 3;
      g.textBaseline = "top";
      for (i = _p = fromIndex, _ref9 = toIndex - 1; _p <= _ref9; i = _p += 1) {
        x = xes[i];
        t = times[i];
        text = moment(t).utc().format(this.minorFormat);
        g.fillText(text, x + xinc, lytext);
      }
    }
    barSlices = null;
    if (this.scene.settings.timeAxis.style.miniTimeRuler && (barSlices != null) && barSlices.xes[barSlices.fromIndex + 1] - barSlices.xes[barSlices.fromIndex] > 2) {
      ty0 = y0 - 1;
      ty1 = y0 + 3;
      xes = barSlices.xes;
      maI0 = this.majorSlices.fromIndex;
      miI0 = this.minorSlices != null ? this.minorSlices.fromIndex : maI0;
      maX = this.majorSlices.xes;
      miX = this.minorSlices != null ? this.minorSlices.xes : maX;
      g.beginPath();
      maI = maI0;
      miI = miI0;
      counter = 0;
      for (i = _q = _ref10 = barSlices.fromIndex, _ref11 = barSlices.toIndex - 2; _ref10 <= _ref11 ? _q <= _ref11 : _q >= _ref11; i = _ref10 <= _ref11 ? ++_q : --_q) {
        x = xes[i];
        while (x > maX[maI]) {
          maI += 1;
        }
        if (maX[maI] === x) {
          continue;
        }
        while (x > miX[miI]) {
          miI += 1;
        }
        if (miX[miI] === x) {
          continue;
        }
        if (x >= x1) {
          break;
        }
        x = (x | 0) - 0.5;
        g.moveTo(x, ty0);
        g.lineTo(x, ty1);
        counter++;
      }
      if (counter) {
        Base_Graphics.stroke(g, this.scene.settings.timeAxis.style.minorTimeRuler1);
      }
      counter = 0;
      g.beginPath();
      maI = maI0;
      miI = miI0;
      for (i = _r = _ref12 = barSlices.fromIndex, _ref13 = barSlices.toIndex - 2; _ref12 <= _ref13 ? _r <= _ref13 : _r >= _ref13; i = _ref12 <= _ref13 ? ++_r : --_r) {
        x = xes[i];
        while (x > maX[maI]) {
          maI += 1;
        }
        if (maX[maI] === x) {
          continue;
        }
        while (x > miX[miI]) {
          miI += 1;
        }
        if (miX[miI] === x) {
          continue;
        }
        if (x >= x1) {
          break;
        }
        x = (x | 0) + 0.5;
        g.moveTo(x, ty0);
        g.lineTo(x, ty1);
        counter++;
      }
      if (counter) {
        Base_Graphics.stroke(g, this.scene.settings.timeAxis.style.minorTimeRuler2);
      }
    }
    Base_Graphics.popClip(g);
  };

  Timechart_TimeAxis.prototype.paintTimeBallon = function(g, x0, y0, w, h) {
    var m, r, s, x, y;
    w = Math.max(w, h * 2);
    m = 5;
    s = 4;
    r = (h + s * 2) / 2;
    x = x0;
    y = y0;
    g.moveTo(x, y);
    x += m;
    y += m;
    g.lineTo(x, y);
    x += w / 2 - s - m;
    g.lineTo(x, y);
    g.arc(x, y + r, r, -Math.PI / 2, Math.PI / 2);
    y += r * 2;
    x -= w - 2 * s;
    g.lineTo(x, y);
    g.arc(x, y - r, r, Math.PI * 0.5, Math.PI * 1.5);
    y -= r * 2;
    x += w / 2 - s - m;
    g.lineTo(x, y);
    x += m;
    y -= m;
    g.closePath();
    return y0 + m + r;
  };

  Timechart_TimeAxis.prototype.paintTimeBallon2 = function(g, x0, y0, w, h) {
    var r, s, x, y;
    s = 4;
    r = (h + s * 2) / 2;
    w = Math.max(w, h * 2) / 2 - s;
    x = x0 + w;
    y = y0 - r;
    g.moveTo(x, y);
    g.arc(x, y + r, r, -Math.PI / 2, Math.PI / 2, false);
    y += r * 2;
    x -= w * 2;
    g.lineTo(x, y);
    g.arc(x, y - r, r, Math.PI * 0.5, Math.PI * 1.5, false);
    return g.closePath();
  };

  return Timechart_TimeAxis;

})();

/*
//@ sourceMappingURL=TimeAxis.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_DataWarehouse;

Timechart_DataWarehouse = (function() {
  function Timechart_DataWarehouse(renderer) {
    this.renderer = renderer;
    this.chart = this.renderer.chart;
    this.scene = this.renderer.scene;
    this.dataSources = {};
    this.requests = {};
    this.results = {};
    this.dataSlicesCache = {};
    this.nextRequestId = 0;
    this.hasNewRequests = false;
  }

  Timechart_DataWarehouse.prototype.registerDataProcessingRequest = function(params) {
    this.requests[this.nextRequestId] = params;
    this.results[this.nextRequestId] = {
      leadIn: null,
      leadOut: null,
      times: [],
      xes: [],
      values: [],
      fromIndex: 0,
      toIndex: 0,
      data: [],
      from: 0,
      to: 0,
      slicer: null
    };
    this.hasNewRequests = true;
    return this.nextRequestId++;
  };

  Timechart_DataWarehouse.prototype.removeDataProcessingRequest = function(id) {
    delete this.requests[id];
    return delete this.results[id];
  };

  Timechart_DataWarehouse.prototype.getData = function(requestId) {
    return this.results[requestId];
  };

  Timechart_DataWarehouse.prototype.process = function(event) {
    var changes, dataUpdate, forceDataUpdate, i, request, result, v, _i, _len, _ref, _ref1;
    changes = event.changes;
    if (changes.settings || changes.data) {
      this.dataSources = {};
      if (Base_Helpers.isArray(this.scene.data)) {
        _ref = this.scene.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          this.dataSources[v.name] = v;
        }
      } else {
        this.dataSources['default'] = this.scene.data;
      }
    }
    if (!(changes.time || changes.data || changes.displayUnit || changes.bounds || changes.settings || this.hasNewRequests)) {
      return;
    }
    if (this.scene.timeStart >= this.scene.timeEnd) {
      this.dataExistsFrom = null;
      this.dataExistsTo = null;
      return;
    }
    this.hasNewRequests = false;
    forceDataUpdate = changes.data || changes.time;
    _ref1 = this.requests;
    for (i in _ref1) {
      request = _ref1[i];
      result = this.results[i];
      dataUpdate = this.updateData(forceDataUpdate, request, result);
      this.updateSlices(dataUpdate, request, result);
    }
  };

  Timechart_DataWarehouse.prototype.updateData = function(dataUpdate, request, result) {
    var data, dataSource, displayUnit, dt, from, to,
      _this = this;
    dataSource = this.dataSources[request.source];
    displayUnit = this.getUnitToUse(request);
    dt = (this.scene.timeEnd - this.scene.timeStart) * this.scene.settings.data.prefetchRatio;
    if (dataUpdate || (!result.from && this.scene.timeStart) || (!result.to && this.scene.timeEnd) || result.from >= result.to || this.scene.timeStart - dt < result.from || this.scene.timeEnd + dt > result.to || ((this.dataExistsFrom != null) && this.dataExistsFrom > this.scene.timeEnd) || ((this.dataExistsTo != null) && this.dataExistsTo < this.scene.timeStart)) {
      dataUpdate = true;
      from = this.scene.timeStart - dt * 2;
      to = this.scene.timeEnd + dt * 2;
      data = dataSource.getDataForRange(from, to, displayUnit, function() {
        return _this._newDataArrived();
      });
      if (data.from > this.scene.timeEnd || data.to < this.scene.timeStart) {
        result.data = [];
        result.from = 0;
        result.to = 0;
        this.dataExistsFrom = null;
        this.datasExistsTo = null;
        this.renderer.loading = data.loading;
      } else {
        this.renderer.loading = data.loading && (data.from > this.scene.timeStart || data.to < this.scene.timeEnd);
        result.data = data.values;
        result.from = from;
        result.to = to;
        this.dataExistsFrom = data.from;
        this.dataExistsTo = data.to;
      }
    }
    return dataUpdate;
  };

  Timechart_DataWarehouse.prototype.updateSlices = function(dataUpdate, request, result) {
    var agr, data, dataIndex, displayUnit, i, np, slice, sliceNewAfter, sliceNewBefore, sliceOffset, times, values, _ref;
    displayUnit = this.getUnitToUse(request);
    dataIndex = request.index;
    agr = request.aggregation;
    np = request.nodataPolicy;
    data = result.data;
    slice = result.slicer = this.getSlice(request, displayUnit);
    _ref = slice.update(this.scene.timeStart, this.scene.timeEnd), sliceOffset = _ref[0], sliceNewBefore = _ref[1], sliceNewAfter = _ref[2];
    times = result.times = slice.times;
    result.xes = slice.xes;
    values = result.values = slice.values;
    data = result.data;
    result.fromIndex = slice.fromIndex;
    result.toIndex = slice.toIndex;
    if (!data) {
      result.values = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = times.length; _i < _len; _i++) {
          i = times[_i];
          _results.push(null);
        }
        return _results;
      })();
      result.leadIn = null;
      return result.leadOut = null;
    } else {
      if (data.length > 0 && dataIndex >= data[0].length) {
        return this.chart.error("No data for this DataIndex: " + dataIndex + ", only " + (data[0].length - 1) + " values present");
      } else {
        if (dataUpdate) {
          this.fillValues(data, times, values, slice.fromIndex, slice.toIndex, agr, dataIndex);
        } else {
          this.fillValues(data, times, values, slice.fromIndex, sliceNewBefore + 1, agr, dataIndex);
          this.fillValues(data, times, values, sliceNewAfter - 1, slice.toIndex, agr, dataIndex);
        }
        return this.setLeads(request, result);
      }
    }
  };

  Timechart_DataWarehouse.prototype.getSlice = function(request, displayUnit) {
    var agr, cacheIndex, index, np, s, source, unit;
    source = request.source;
    index = request.index;
    unit = displayUnit.toString();
    agr = request.aggregation;
    np = request.nodataPolicy;
    cacheIndex = "" + source + ":" + index + ":" + unit + ":" + agr + ":" + np;
    if (this.dataSlicesCache.hasOwnProperty(cacheIndex)) {
      s = this.dataSlicesCache[cacheIndex];
    } else {
      s = this.dataSlicesCache[cacheIndex] = new Timechart_TimeSlicer(this.scene, displayUnit, ["values"]);
    }
    return s;
  };

  Timechart_DataWarehouse.prototype.getUnitToUse = function(request) {
    return this.scene.displayUnit;
  };

  Timechart_DataWarehouse.prototype.setLeads = function(request, result) {
    var agr, data, dataIndex, dataPos, fromIndex, leadIn, leadOut, np, t, t0, t1, time, times, toIndex, v, values, x, x0, x1, _ref, _ref1;
    np = request.nodataPolicy;
    agr = request.aggregation;
    dataIndex = request.index;
    data = result.data;
    values = result.values;
    times = result.times;
    leadIn = null;
    leadOut = null;
    if (np === "join" && data) {
      fromIndex = result.fromIndex;
      if (values[fromIndex] === null) {
        dataPos = Timechart_Data.binSearch(data, times[fromIndex]);
        dataPos = Timechart_Data.linSearchDown(data, dataPos, dataIndex);
        if (dataPos !== -1) {
          time = data[dataPos][0];
          _ref = result.slicer.makeMiniSlice(time), t0 = _ref[0], x0 = _ref[1], t1 = _ref[2], x1 = _ref[3];
          t = [t0, t1];
          x = [x0, x1];
          v = [null, null];
          this.fillValues(data, t, v, 0, 2, agr, dataIndex, {
            fromIndex: 0,
            toIndex: 2
          });
          leadIn = {
            times: t,
            xes: x,
            values: v
          };
        }
      }
      toIndex = result.toIndex;
      if (values[toIndex - 2] === null) {
        dataPos = Timechart_Data.binSearch(data, times[toIndex - 1]);
        dataPos = Timechart_Data.linSearchUp(data, dataPos, dataIndex);
        if (dataPos !== -1) {
          time = data[dataPos][0];
          _ref1 = result.slicer.makeMiniSlice(time), t0 = _ref1[0], x0 = _ref1[1], t1 = _ref1[2], x1 = _ref1[3];
          t = [t0, t1];
          x = [x0, x1];
          v = [null, null];
          this.fillValues(data, t, v, 0, 2, agr, dataIndex);
          leadOut = {
            times: t,
            xes: x,
            values: v,
            fromIndex: 0,
            toIndex: 2
          };
        }
      }
    }
    result.leadIn = leadIn;
    return result.leadOut = leadOut;
  };

  Timechart_DataWarehouse.prototype.fillValues = function(data, times, values, timesI0, timesI1, agr, dataIndex) {
    if (timesI0 + 1 >= timesI1) {
      return;
    }
    if (agr === "sum") {
      return this.fillValueSum(data, times, values, timesI0, timesI1, dataIndex);
    } else if (agr === "min") {
      return this.fillValueMin(data, times, values, timesI0, timesI1, dataIndex);
    } else if (agr === "max") {
      return this.fillValueMax(data, times, values, timesI0, timesI1, dataIndex);
    } else if (agr === "avg") {
      return this.fillValueAvg(data, times, values, timesI0, timesI1, dataIndex);
    } else if (agr === "first") {
      return this.fillValueFirst(data, times, values, timesI0, timesI1, dataIndex);
    } else if (agr === "last") {
      return this.fillValueLast(data, times, values, timesI0, timesI1, dataIndex);
    } else {
      return this.chart.error("Unrecognized aggregation function: " + agr);
    }
  };

  Timechart_DataWarehouse.prototype.fillValueSum = function(data, times, values, timesI0, timesI1, dataIndex) {
    var acc, count, dataLen, fromIndex, i, toTime, value, _i, _ref;
    dataLen = data.length;
    fromIndex = Timechart_Data.binSearch(data, times[timesI0]);
    for (i = _i = timesI0, _ref = timesI1 - 2; _i <= _ref; i = _i += 1) {
      toTime = times[i + 1];
      acc = 0;
      count = 0;
      while (fromIndex < dataLen && data[fromIndex][0] < toTime) {
        value = data[fromIndex][dataIndex];
        fromIndex += 1;
        if (value !== null) {
          acc += value;
          count += 1;
        }
      }
      if (count > 0) {
        values[i] = acc;
      } else {
        values[i] = null;
      }
    }
  };

  Timechart_DataWarehouse.prototype.fillValueMin = function(data, times, values, timesI0, timesI1, dataIndex) {
    var acc, count, dataLen, fromIndex, i, toTime, value, _i, _ref;
    dataLen = data.length;
    fromIndex = Timechart_Data.binSearch(data, times[timesI0]);
    for (i = _i = timesI0, _ref = timesI1 - 2; _i <= _ref; i = _i += 1) {
      toTime = times[i + 1];
      acc = Infinity;
      count = 0;
      while (fromIndex < dataLen && data[fromIndex][0] < toTime) {
        value = data[fromIndex][dataIndex];
        fromIndex += 1;
        if (value !== null) {
          acc = Math.min(acc, value);
          count += 1;
        }
      }
      if (count > 0) {
        values[i] = acc;
      } else {
        values[i] = null;
      }
    }
  };

  Timechart_DataWarehouse.prototype.fillValueMax = function(data, times, values, timesI0, timesI1, dataIndex) {
    var acc, count, dataLen, fromIndex, i, toTime, value, _i, _ref;
    dataLen = data.length;
    fromIndex = Timechart_Data.binSearch(data, times[timesI0]);
    for (i = _i = timesI0, _ref = timesI1 - 2; _i <= _ref; i = _i += 1) {
      toTime = times[i + 1];
      acc = -Infinity;
      count = 0;
      while (fromIndex < dataLen && data[fromIndex][0] < toTime) {
        value = data[fromIndex][dataIndex];
        fromIndex += 1;
        if (value !== null) {
          count += 1;
          acc = Math.max(acc, value);
        }
      }
      if (count > 0) {
        values[i] = acc;
      } else {
        values[i] = null;
      }
    }
  };

  Timechart_DataWarehouse.prototype.fillValueAvg = function(data, times, values, timesI0, timesI1, dataIndex) {
    var acc, count, dataLen, fromIndex, i, toTime, value, _i, _ref;
    dataLen = data.length;
    fromIndex = Timechart_Data.binSearch(data, times[timesI0]);
    for (i = _i = timesI0, _ref = timesI1 - 2; _i <= _ref; i = _i += 1) {
      toTime = times[i + 1];
      acc = 0;
      count = 0;
      while (fromIndex < dataLen && data[fromIndex][0] < toTime) {
        value = data[fromIndex][dataIndex];
        fromIndex += 1;
        if (value !== null) {
          acc += value;
          count += 1;
        }
      }
      if (count > 0) {
        values[i] = acc / count;
      } else {
        values[i] = null;
      }
    }
  };

  Timechart_DataWarehouse.prototype.fillValueFirst = function(data, times, values, timesI0, timesI1, dataIndex) {
    var acc, count, dataLen, fromIndex, i, toTime, value, _i, _ref;
    dataLen = data.length;
    fromIndex = Timechart_Data.binSearch(data, times[timesI0]);
    for (i = _i = timesI0, _ref = timesI1 - 2; _i <= _ref; i = _i += 1) {
      toTime = times[i + 1];
      acc = null;
      count = 0;
      while (fromIndex < dataLen && data[fromIndex][0] < toTime) {
        value = data[fromIndex][dataIndex];
        fromIndex += 1;
        if (value !== null && count === 0) {
          acc = value;
          count += 1;
        }
      }
      values[i] = acc;
    }
  };

  Timechart_DataWarehouse.prototype.fillValueLast = function(data, times, values, timesI0, timesI1, dataIndex) {
    var acc, dataLen, fromIndex, i, toTime, value, _i, _ref;
    dataLen = data.length;
    fromIndex = Timechart_Data.binSearch(data, times[timesI0]);
    for (i = _i = timesI0, _ref = timesI1 - 2; _i <= _ref; i = _i += 1) {
      toTime = times[i + 1];
      acc = null;
      while (fromIndex < dataLen && data[fromIndex][0] < toTime) {
        value = data[fromIndex][dataIndex];
        fromIndex += 1;
        if (value !== null) {
          acc = value;
        }
      }
      values[i] = acc;
    }
  };

  Timechart_DataWarehouse.prototype._newDataArrived = function() {
    return this.renderer.events.notifySceneChanges({
      data: true
    });
  };

  return Timechart_DataWarehouse;

})();

/*
//@ sourceMappingURL=DataWarehouse.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Renderer_Columns;

Timechart_Renderer_Columns = (function() {
  "use strict";
  function Timechart_Renderer_Columns(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.prevy = [];
  }

  Timechart_Renderer_Columns.prototype.paintStack = function(context, series, centers, radii, ystack, zeroY) {
    var approxWidth, i, padding, paddingLeft, paddingRight, prevy, ser, _i, _j, _k, _l, _len, _len1, _len2, _ref, _results, _results1;
    this.zeroY = zeroY;
    if (!(centers.length > 0)) {
      return;
    }
    paddingLeft = 0;
    paddingRight = 0;
    for (_i = 0, _len = series.length; _i < _len; _i++) {
      ser = series[_i];
      padding = ser.style.padding;
      if (padding.length) {
        paddingLeft = Math.max(paddingLeft, padding[0]);
        paddingRight = Math.max(paddingRight, padding[1]);
      } else if (parseFloat(padding)) {
        paddingRight = Math.max(paddingRight, parseInt(padding));
      }
    }
    this.paddingLeft = paddingLeft;
    this.paddingRight = paddingRight;
    prevy = this.prevy;
    if (prevy.length < centers.length) {
      prevy = this.prevy = new Array(centers.length);
    }
    for (i = _j = 0, _ref = centers.length - 1; _j <= _ref; i = _j += 1) {
      prevy[i] = zeroY;
    }
    approxWidth = radii[0] + radii[radii.length - 1];
    if (approxWidth - paddingLeft - paddingRight >= 2) {
      _results = [];
      for (i = _k = 0, _len1 = series.length; _k < _len1; i = ++_k) {
        ser = series[i];
        _results.push(this.plainColumns(context, ser.style, centers, radii, prevy, ystack, i));
      }
      return _results;
    } else {
      _results1 = [];
      for (i = _l = 0, _len2 = series.length; _l < _len2; i = ++_l) {
        ser = series[i];
        _results1.push(this.outline(context, ser.style, centers, radii, prevy, ystack[i]));
      }
      return _results1;
    }
  };

  Timechart_Renderer_Columns.prototype.outline = function(context, style, centers, radii, ybase, yvalues) {
    var i, len, x0, x1, y, y0, zeroY, _i, _ref, _results;
    if (style.strokeStyle) {
      context.fillStyle = style.lineColor;
    } else {
      context.fillStyle = style.fillColor;
    }
    zeroY = this.zeroY;
    len = centers.length;
    x0 = centers[0] - radii[0];
    _results = [];
    for (i = _i = 0, _ref = len - 1; _i <= _ref; i = _i += 1) {
      x1 = centers[i] + radii[i];
      y0 = ybase[i];
      y = yvalues[i];
      if (y !== null) {
        y = zeroY - y;
        context.fillRect(x0, y0, x1 - x0 + 0.5, y - y0);
        ybase[i] = y;
      }
      _results.push(x0 = x1);
    }
    return _results;
  };

  Timechart_Renderer_Columns.prototype.plainColumns = function(context, style, centers, radii, ybase, yvaluesAll, yindex) {
    var bottom, center, cheight, cleft, ctop, cwidth, depth, depthColor, fillStyle, h, i, isFirst, isLast, j, paddingLeft, paddingTotal, paintTop, r, shadowColor, strokeWidth, top, y, y0, y1, yvalues, zeroY, _i, _len, _ref, _results;
    _ref = [this.scene.y0, this.scene.height], top = _ref[0], h = _ref[1];
    bottom = top + h;
    paddingLeft = this.paddingLeft;
    paddingTotal = this.paddingLeft + this.paddingRight;
    zeroY = this.zeroY;
    if (style.lineColor) {
      context.lineWidth = strokeWidth = style.lineWidth;
      context.strokeStyle = style.lineColor;
    } else {
      strokeWidth = 0;
    }
    fillStyle = style.fillColor;
    if ((style.gradient != null) && style.gradient !== 1 && fillStyle) {
      fillStyle = context.createLinearGradient(0, bottom, 0, bottom - h * 2 / 3);
      fillStyle.addColorStop(0, Base_Graphics.deriveColor(style.fillColor, style.gradient, 1));
      fillStyle.addColorStop(1, style.fillColor);
    }
    context.fillStyle = fillStyle;
    depth = style.depth;
    if (style.fillColor && depth) {
      depthColor = style.fillColor;
      if (style.depthBrightness != null) {
        depthColor = Base_Graphics.deriveColor(depthColor, style.depthBrightness, 1);
      }
    } else {
      depthColor = null;
    }
    shadowColor = style.shadowColor;
    yvalues = yvaluesAll[yindex];
    _results = [];
    for (i = _i = 0, _len = centers.length; _i < _len; i = ++_i) {
      center = centers[i];
      y = yvalues[i];
      if (y === null) {
        continue;
      }
      r = radii[i];
      y0 = ybase[i];
      y1 = zeroY - y;
      ybase[i] = y1;
      cleft = center - r + paddingLeft;
      cwidth = r + r - paddingTotal;
      if (y0 < y1) {
        ctop = y0;
        cheight = y1 - y0;
        isFirst = true;
        j = yindex - 1;
        while (j > 0) {
          if (yvaluesAll[j][i] !== null) {
            isFirst = false;
            break;
          }
          j--;
        }
        paintTop = isFirst;
      } else {
        ctop = y1;
        cheight = y0 - y1;
        isLast = true;
        j = yindex + 1;
        while (j < yvaluesAll.length) {
          if (yvaluesAll[j][i] !== null) {
            isLast = false;
            break;
          }
          j++;
        }
        paintTop = isLast;
      }
      if (depthColor) {
        context.beginPath();
        Base_Graphics.applyShadow(context, style);
        if (!paintTop) {
          context.moveTo(cleft + cwidth, ctop);
          context.lineTo(cleft + cwidth + depth, ctop - depth);
          context.lineTo(cleft + cwidth + depth, ctop + cheight - depth);
          context.lineTo(cleft + cwidth, ctop + cheight);
          context.lineTo(cleft + cwidth, ctop);
        } else {
          context.moveTo(cleft + depth, ctop - depth);
          context.lineTo(cleft + cwidth + depth, ctop - depth);
          context.lineTo(cleft + cwidth + depth, ctop + cheight - depth);
          context.lineTo(cleft + cwidth, ctop + cheight);
          context.lineTo(cleft + cwidth, ctop);
          context.lineTo(cleft, ctop);
        }
        context.closePath();
        context.fillStyle = depthColor;
        context.fill();
        Base_Graphics.clearShadow(context);
        context.fillStyle = fillStyle;
      }
      cwidth -= strokeWidth;
      if (cwidth > 0) {
        cheight -= strokeWidth;
        if (cheight > 0) {
          if (!depthColor && shadowColor) {
            Base_Graphics.applyShadow(context, style);
          }
          if (fillStyle) {
            context.fillRect(cleft + strokeWidth / 2, ctop + strokeWidth / 2, cwidth, cheight);
            if (!depthColor && shadowColor) {
              Base_Graphics.clearShadow(context);
            }
          }
          if (strokeWidth > 0) {
            context.strokeRect(cleft + strokeWidth / 2, ctop + strokeWidth / 2, cwidth, cheight);
            if (!fillStyle && !depthColor && shadowColor) {
              _results.push(Base_Graphics.clearShadow(context));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else if (strokeWidth > 0) {
          context.beginPath();
          context.moveTo(cleft + strokeWidth / 2, y0);
          context.lineTo(cleft + strokeWidth / 2 + cwidth, y0);
          _results.push(context.stroke());
        } else {
          _results.push(void 0);
        }
      } else if (strokeWidth > 0) {
        context.beginPath();
        context.moveTo(center, ctop + strokeWidth / 2);
        context.lineTo(center, ctop + cheight - strokeWidth);
        _results.push(context.stroke());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Timechart_Renderer_Columns;

})();

/*
//@ sourceMappingURL=Columns.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Renderer_Line;

Timechart_Renderer_Line = (function() {
  "use strict";
  function Timechart_Renderer_Line(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.prevy = [];
  }

  Timechart_Renderer_Line.prototype.paintStack = function(context, series, centers, radii, ystack, zeroY) {
    var i, j, prevSegments, prevy, segments, ser, _i, _j, _k, _len, _ref, _ref1, _ref2, _results;
    this.zeroY = zeroY;
    if (!(centers.length > 0)) {
      return;
    }
    prevy = this.prevy;
    if (prevy.length < centers.length) {
      prevy = this.prevy = new Array(centers.length);
    }
    for (i = _i = 0, _ref = centers.length - 1; _i <= _ref; i = _i += 1) {
      prevy[i] = zeroY;
    }
    prevSegments = null;
    _results = [];
    for (i = _j = 0, _len = series.length; _j < _len; i = ++_j) {
      ser = series[i];
      segments = this.buildLineSegments(centers, zeroY, prevy, ystack[i], ser.data.nodataPolicy);
      if (ser.style.smoothing) {
        for (j = _k = 0, _ref1 = segments.length - 1; _k <= _ref1; j = _k += 2) {
          _ref2 = this.smoothLine(segments[j], segments[j + 1], ser.style.smoothing), segments[j] = _ref2[0], segments[j + 1] = _ref2[1];
        }
      }
      this.paintLine(context, ser.style, prevSegments, segments);
      this.simpleMarkers(context, ser.style, centers, zeroY, ystack[i]);
      _results.push(prevSegments = segments);
    }
    return _results;
  };

  Timechart_Renderer_Line.prototype.paintLine = function(context, style, prevSegments, segments) {
    var i, _i, _j, _ref, _ref1;
    if (style.fillColor) {
      if (style.shadowColor) {
        Base_Graphics.applyShadow(context, style);
      }
      context.fillStyle = style.fillColor;
      context.beginPath();
      for (i = _i = 0, _ref = segments.length - 1; _i <= _ref; i = _i += 2) {
        this.addArea(context, segments[i], segments[i + 1], prevSegments);
      }
      context.fill();
      if (style.shadowColor) {
        Base_Graphics.clearShadow(context);
      }
    }
    if (style.lineColor) {
      if (!style.fillColor && style.shadowColor) {
        Base_Graphics.applyShadow(context, style);
      }
      context.strokeStyle = style.lineColor;
      context.lineWidth = style.lineWidth;
      context.beginPath();
      for (i = _j = 0, _ref1 = segments.length - 1; _j <= _ref1; i = _j += 2) {
        this.addLine(context, segments[i], segments[i + 1]);
      }
      context.stroke();
      if (!style.fillColor && style.shadowColor) {
        return Base_Graphics.clearShadow(context);
      }
    }
  };

  Timechart_Renderer_Line.prototype.addLine = function(context, xlist, ylist) {
    var i, _i, _ref, _results;
    context.moveTo(xlist[0], ylist[0]);
    _results = [];
    for (i = _i = 1, _ref = xlist.length - 1; _i <= _ref; i = _i += 1) {
      _results.push(context.lineTo(xlist[i], ylist[i]));
    }
    return _results;
  };

  Timechart_Renderer_Line.prototype.addArea = function(context, xlist, ylist, previousSegments) {
    var curY, curx, i, j, l, prevY, prevx, prop, x, x0, x1, xx, y, yy, yz, _i, _j, _k, _ref, _ref1;
    context.moveTo(xlist[0], ylist[0]);
    for (i = _i = 1, _ref = xlist.length - 1; _i <= _ref; i = _i += 1) {
      context.lineTo(xlist[i], ylist[i]);
    }
    x0 = xlist[0];
    x1 = xlist[xlist.length - 1];
    yz = this.zeroY;
    x = x1;
    if (previousSegments) {
      for (j = _j = _ref1 = previousSegments.length - 2; _j >= 0; j = _j += -2) {
        xx = previousSegments[j];
        yy = previousSegments[j + 1];
        if (xx.length < 2 || xx[0] > x || xx[xx.length - 1] < x0) {
          continue;
        }
        l = xx.length - 1;
        prevx = xx[l];
        if (prevx < x) {
          context.lineTo(x, yz);
          context.lineTo(prevx, yz);
          x = prevx;
        }
        for (i = _k = l; _k >= 0; i = _k += -1) {
          curx = xx[i];
          if (x === prevx) {
            context.lineTo(prevx, yy[i + 1]);
            x = curx;
          } else if (x > prevx) {
            curY = yy[i];
            prevY = yy[i + 1];
            prop = (x - curx) / (prevx - curx);
            y = curY + prop * (prevY - curY);
            context.lineTo(x, y);
            x = curx;
          }
          if (x <= x0) {
            x = x0;
            curY = yy[i];
            prevY = yy[i + 1];
            prop = (x - curx) / (prevx - curx);
            y = curY + prop * (prevY - curY);
            context.lineTo(x, y);
            break;
          }
          prevx = curx;
        }
      }
    }
    if (x !== x0) {
      context.lineTo(x, yz);
      context.lineTo(x0, yz);
    }
    return context.closePath();
  };

  Timechart_Renderer_Line.prototype.buildLineSegments = function(centers, zeroY, prevY, newY, nodataPolicy) {
    var i, segments, x, xe, y, ye, _i, _ref;
    segments = [];
    xe = [];
    ye = [];
    for (i = _i = 0, _ref = centers.length - 1; _i <= _ref; i = _i += 1) {
      x = centers[i];
      y = newY[i];
      if (y !== null) {
        xe.push(x);
        ye.push(zeroY - y);
      } else if (nodataPolicy === "zero") {
        xe.push(x);
        ye.push(prevY[i]);
      } else if (nodataPolicy === "join") {

      } else if (xe.length > 0) {
        segments.push(xe, ye);
        xe = [];
        ye = [];
      }
    }
    if (xe.length > 0) {
      segments.push(xe, ye);
    }
    return segments;
  };

  Timechart_Renderer_Line.prototype.simpleMarkers = function(context, style, xlist, zeroY, ylist) {
    var fill, i, marker, r, shape, x, y, _i, _len, _results;
    if (!(style.marker && style.marker.shape && style.marker.width)) {
      return;
    }
    marker = style.marker;
    fill = marker.fillColor;
    if (!fill) {
      fill = style.lineColor;
    }
    if (!fill) {
      fill = style.fillColor;
    }
    context.fillStyle = fill;
    r = marker.width / 2;
    shape = marker.shape;
    _results = [];
    for (i = _i = 0, _len = xlist.length; _i < _len; i = ++_i) {
      x = xlist[i];
      y = ylist[i];
      if (y === null) {
        continue;
      }
      y = zeroY - y;
      context.beginPath();
      Base_Graphics.strokeMarker(context, shape, x, y, r);
      _results.push(context.fill());
    }
    return _results;
  };

  Timechart_Renderer_Line.prototype.smoothLine = function(xlist, ylist, smoothing) {
    var c, distance, newx, newy, pointDistance, x, x1;
    c = new Base_MonotoneCurve(xlist, ylist);
    newx = [];
    newy = [];
    x = xlist[0];
    x1 = xlist[xlist.length - 1];
    pointDistance = (x1 - x) / xlist.length;
    if (pointDistance < 2) {
      return [xlist, ylist];
    }
    distance = Math.min(6, pointDistance / 3);
    while (x < x1) {
      newx.push(x);
      newy.push(c.interpolate(x));
      x += distance;
    }
    newx.push(x1);
    newy.push(c.interpolate(x1));
    return [newx, newy];
  };

  return Timechart_Renderer_Line;

})();

/*
//@ sourceMappingURL=Line.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar_Button, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar_Button = (function(_super) {
  __extends(Base_Bar_Button, _super);

  "use strict";

  function Base_Bar_Button() {
    _ref = Base_Bar_Button.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Base_Bar_Button.prototype.defaultButtonOptions = {
    type: "default",
    activeClass: "btn-active",
    hasIcon: true
  };

  Base_Bar_Button.prototype.active = false;

  Base_Bar_Button.prototype.init = function() {
    var _this = this;
    Base_Bar_Button.__super__.init.call(this);
    Base_Helpers.configure(this.options, this.defaultButtonOptions);
    if (this.options.activeClass) {
      this.activeClass = Base_Helpers.wrapClass(this.parent, this.options.activeClass);
    } else {
      this.activeClass = false;
    }
    this.ui.a = Base_Helpers.createDom("a", null, null, this.ui.container);
    if (this.options.title) {
      this.ui.a.setAttribute("title", this.options.title);
    }
    Base_Helpers.addClass(this.ui.a, Base_Helpers.wrapClass(this.parent, "btn-" + (this.options.css ? this.options.css : this.options.type) + ",btn"));
    if (this.options.label || this.options.hasIcon) {
      this.ui.p = Base_Helpers.createDom("p", null, this.options.label, this.ui.a);
    }
    if (!this.options.onClick) {
      this.options.onClick = this.defaultOnClick;
    }
    return Base_Helpers.listen(this.ui.a, "click", function(ev) {
      if (_this.parent.toggleState) {
        _this.parent.toggleState(_this);
      } else {
        _this.toggleState();
      }
      return _this.options.onClick(_this, ev);
    });
  };

  Base_Bar_Button.prototype.defaultOnClick = function(obj, ev) {
    return console.error("No event handler for this item", obj, ev);
  };

  Base_Bar_Button.prototype.toggleState = function(hide) {
    if (!this.activeClass) {
      return;
    }
    if (typeof hide !== "undefined") {
      if (!hide) {
        this.active = true;
        return Base_Helpers.addClass(this.ui.a, this.activeClass);
      } else if (hide) {
        this.active = false;
        return Base_Helpers.removeClass(this.ui.a, this.activeClass);
      }
    } else {
      if (this.active) {
        this.active = false;
        return Base_Helpers.removeClass(this.ui.a, this.activeClass);
      } else {
        this.active = true;
        return Base_Helpers.addClass(this.ui.a, this.activeClass);
      }
    }
  };

  return Base_Bar_Button;

})(Base_Bar_Item);

/*
//@ sourceMappingURL=Button.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar_CycleButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar_CycleButton = (function(_super) {
  __extends(Base_Bar_CycleButton, _super);

  function Base_Bar_CycleButton(options) {
    var _this = this;
    this.options = {
      label: null,
      type: "gear",
      enclosureClass: "enc-bare",
      activeClass: null,
      onClick: function() {
        return _this.parent.cycleNext();
      }
    };
    Base_Helpers.configure(this.options, options);
    Base_Bar_CycleButton.__super__.constructor.call(this, this.options);
  }

  return Base_Bar_CycleButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=CycleButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Settings,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Settings = (function(_super) {
  __extends(Timechart_Settings, _super);

  Timechart_Settings.StaticChart = {
    interaction: {
      zooming: {
        enabled: false
      },
      selection: {
        enabled: false
      },
      scrolling: {
        enabled: false
      }
    }
  };

  Timechart_Settings.FlatTheme = {
    advanced: {
      themeCSSClass: "TC-flat",
      assets: ["timechart.css", "jspdf/jspdf.min.js", "jspdf/jspdf.plugin.addimage.min.js"]
    },
    area: {
      style: {
        noData: {
          fillColor: "#DDD",
          image: "builtin-no-data-light"
        },
        loadingData: {
          fillColor: "#EEE"
        }
      }
    },
    chartTypes: {
      columns: {
        style: {
          gradient: 1,
          depth: 0
        }
      }
    },
    timeAxis: {
      style: {
        showMajorTimeBalloons: false,
        majorTimeLabel: {
          fillColor: "#000"
        },
        dateLighten: {
          fillColor: "rgba(0,0,0,0.05)"
        }
      }
    }
  };

  Timechart_Settings.RoundTheme = {
    advanced: {
      themeCSSClass: "TC-round",
      assets: ["timechart.css", "jspdf/jspdf.min.js", "jspdf/jspdf.plugin.addimage.min.js"]
    },
    valueAxis: {
      "default": {
        style: {
          valueLabel: {
            fillColor: "#000000",
            font: "11px Arial",
            shadowOffsetX: 0,
            shadowOffsetY: 1,
            shadowBlur: 0,
            shadowColor: "rgba(255,255,255,0.5)"
          }
        }
      }
    },
    timeAxis: {
      style: {
        showMinorTimeBalloons: false,
        showMajorTimeBalloons: true,
        minorTimeBalloonStyle: {
          fillColor: "#FFF",
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          shadowBlur: 2,
          shadowColor: "#888"
        },
        majorTimeBalloonStyle: {
          fillColor: "AAA",
          shadowOffsetX: 0,
          shadowOffsetY: -1,
          shadowBlur: 0,
          shadowColor: "rgba(0,0,0,0.3)"
        },
        minorTimeLabel: {
          fillColor: "#000000",
          font: "12px Arial",
          shadowOffsetX: 0,
          shadowOffsetY: 1,
          shadowBlur: 0,
          shadowColor: "rgba(255,255,255,0.5)"
        },
        majorTimeLabel: {
          fillColor: "#FFF",
          font: "11px Arial",
          shadowOffsetX: 0,
          shadowOffsetY: 1,
          shadowBlur: 1,
          shadowColor: "#7c7c7c"
        },
        dateLighten: {
          fillColor: "rgba(0,0,0,0.05)"
        },
        dateHolidays: {
          fillColor: "rgba(255,127,127,0.2)"
        },
        minorTimeRuler1: {
          lineColor: "rgba(0,0,0,0.2)"
        },
        minorTimeRuler2: {
          lineColor: "rgba(255,255,255,0.1)"
        }
      }
    },
    chartTypes: {
      columns: {
        style: {
          gradient: 0.8,
          depth: 3
        }
      }
    },
    area: {
      style: {
        noData: {
          image: "builtin-no-data-dark"
        }
      }
    }
  };

  Timechart_Settings.GradientTheme = {
    advanced: {
      themeCSSClass: "TC-gradient",
      assets: ["timechart.css", "jspdf/jspdf.min.js", "jspdf/jspdf.plugin.addimage.min.js"]
    },
    valueAxis: {
      "default": {
        style: {
          valueLabel: {
            fillColor: "#000000",
            font: "11px Arial",
            shadowOffsetX: 0,
            shadowOffsetY: 1,
            shadowBlur: 0,
            shadowColor: "rgba(255,255,255,0.5)"
          }
        }
      }
    },
    timeAxis: {
      style: {
        showMinorTimeBalloons: false,
        showMajorTimeBalloons: true,
        minorTimeBalloonStyle: {
          fillColor: "#FFF",
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          shadowBlur: 2,
          shadowColor: "#888"
        },
        majorTimeBalloonStyle: {
          fillColor: "AAA",
          shadowOffsetX: 0,
          shadowOffsetY: -1,
          shadowBlur: 0,
          shadowColor: "rgba(0,0,0,0.3)"
        },
        minorTimeLabel: {
          fillColor: "#000000",
          font: "12px Arial",
          shadowOffsetX: 0,
          shadowOffsetY: 1,
          shadowBlur: 0,
          shadowColor: "rgba(255,255,255,0.5)"
        },
        majorTimeLabel: {
          fillColor: "#FFF",
          font: "11px Arial",
          shadowOffsetX: 0,
          shadowOffsetY: 1,
          shadowBlur: 1,
          shadowColor: "#7c7c7c"
        },
        dateLighten: {
          fillColor: "rgba(255,255,255,0.2)"
        },
        dateHolidays: {
          fillColor: "rgba(255,127,127,0.2)"
        },
        minorTimeRuler1: {
          lineColor: "rgba(0,0,0,0.2)"
        },
        minorTimeRuler2: {
          lineColor: "rgba(255,255,255,0.1)"
        }
      }
    },
    chartTypes: {
      columns: {
        style: {
          gradient: 0.8,
          depth: 3
        }
      }
    },
    area: {
      style: {
        noData: {
          image: "builtin-no-data-dark"
        }
      }
    }
  };

  Timechart_Settings.defaults = {
    theme: Timechart_Settings.FlatTheme,
    area: {
      initialDisplayPeriod: "max",
      initialDisplayAnchor: "newestData",
      initialDisplayUnit: "auto",
      displayUnits: [
        {
          unit: "1 s",
          name: "second"
        }, {
          unit: "5 s",
          name: "5 seconds"
        }, {
          unit: "1 m",
          name: "minute"
        }, {
          unit: "5 m",
          name: "5 minutes"
        }, {
          unit: "1 h",
          name: "hour"
        }, {
          unit: "6 h",
          name: "6 hours"
        }, {
          unit: "1 d",
          name: "day"
        }, {
          unit: "1 M",
          name: "month"
        }, {
          unit: "1 y",
          name: "year"
        }
      ],
      displayPeriods: [
        {
          displayPeriod: "10 ms"
        }, {
          displayPeriod: "100 ms"
        }, {
          displayPeriod: "s"
        }, {
          displayPeriod: "m"
        }, {
          displayPeriod: "h"
        }, {
          displayPeriod: "d"
        }, {
          displayPeriod: "M"
        }, {
          displayPeriod: "y"
        }, {
          displayPeriod: "10 y"
        }, {
          displayPeriod: "100 y"
        }
      ],
      noData: true,
      currentTimeMarker: "",
      style: {
        noData: {
          fillColor: "#888",
          image: "builtin-no-data-dark"
        },
        loadingData: {
          fillColor: "#BBB"
        },
        zoomHighlight: {
          fillColor: "rgba(30,160,220,0.15)",
          fadeIn: 100,
          fadeOut: 500,
          fadeCross: 500
        },
        zoomHighlightInactive: {
          fillColor: "rgba(30,160,220,0.08)"
        },
        currentTimeMarker: {
          lineColor: "red",
          fillColor: "red"
        },
        markerText: {
          font: "12px Arial"
        },
        selection: {
          lineColor: "#000000",
          fillColor: "rgba(30,160,220,0.15)"
        },
        selectionLabel: {
          fillColor: "#000000",
          font: "12px Arial"
        }
      }
    },
    colors: [],
    chartTypes: {
      columns: {
        style: {
          minHeight: 4,
          minWidth: 12,
          maxWidth: 500,
          gradient: 0.8,
          lineColor: "",
          fillColor: "limegreen",
          lineWidth: 1,
          padding: [3, 3],
          shadowOffsetX: 1,
          shadowOffsetY: -1,
          shadowBlur: 3,
          shadowColor: null,
          depth: 0,
          depthBrightness: 0.5
        }
      },
      line: {
        style: {
          minWidth: 6,
          maxWidth: 200,
          lineColor: "#f00",
          fillColor: "",
          lineWidth: 1,
          shadowOffsetX: 1,
          shadowOffsetY: -1,
          shadowBlur: 5,
          shadowColor: false,
          smoothing: false,
          marker: {
            shape: null,
            width: 10,
            fillColor: ""
          }
        }
      }
    },
    stacks: {
      "default": {
        name: "",
        type: "normal"
      }
    },
    series: [
      {
        enabled: true,
        type: "columns",
        valueAxis: "default",
        stack: null,
        cluster: null,
        data: {
          source: "default",
          index: 1,
          aggregation: "sum",
          nodataPolicy: "join"
        },
        style: {}
      }
    ],
    computedSeries: [],
    valueAxis: {
      "default": {
        enabled: true,
        position: "outside",
        side: "left",
        size: 45,
        logScale: false,
        hgrid: true,
        scaleAdjustmentTolerance: 0.3,
        scaleAdjustmentAnimationDelay: 200,
        scaleAdjustmentAnimation: "=",
        zeroLine: "visible",
        style: {
          tick: {
            lineColor: "#AAAAAA"
          },
          valueLabel: {
            fillColor: "#000000",
            font: "11px Arial"
          },
          labelSpacing: 25,
          baseLineStyle: "rgba(127,127,127,0.5)",
          baseLineFillStyle: "rgba(127,127,127,0.5)",
          baseLineWidth: 1,
          baseLineDepth: 1,
          hgrid1: {
            lineColor: "rgba(127,127,127,0.1)"
          },
          hgrid2: {
            lineColor: "rgba(255,255,255,0.2)"
          }
        }
      },
      secondary: {
        enabled: false,
        position: "outside",
        side: "right",
        hgrid: true,
        size: 45,
        logScale: false,
        scaleAdjustmentTolerance: 0.3,
        scaleAdjustmentAnimationDelay: 200,
        scaleAdjustmentAnimation: "=",
        zeroLine: "visible",
        style: {
          tick: {
            lineColor: "#AAAAAA"
          },
          valueLabel: {
            fillColor: "#bb8000",
            font: "11px Arial"
          },
          labelSpacing: 25,
          baseLineStyle: "rgba(187,128,0,0.5)",
          baseLineWidth: 1,
          baseLineDepth: 0,
          hgrid1: {
            lineColor: "rgba(187,128,0,0.1)"
          },
          hgrid2: {
            lineColor: "rgba(255,235,235,0.2)"
          }
        }
      }
    },
    timeAxis: {
      enabled: true,
      size: 44,
      vgrid: true,
      style: {
        miniTimeRuler: true,
        showMinorTimeBalloons: false,
        showMajorTimeBalloons: true,
        minorTimeBalloonStyle: {
          fillColor: "#FFF"
        },
        majorTimeBalloonStyle: {
          fillColor: "AAA"
        },
        minorTimeLabel: {
          fillColor: "#000000",
          font: "12px Arial"
        },
        majorTimeLabel: {
          fillColor: "#FFF",
          font: "11px Arial"
        },
        dateLighten: {
          fillColor: "rgba(255,255,255,0.2)"
        },
        dateHolidays: {
          fillColor: "rgba(255,127,127,0.2)"
        },
        minorTimeRuler1: {
          lineColor: "rgba(0,0,0,0.2)"
        },
        minorTimeRuler2: {
          lineColor: "rgba(255,255,255,0.1)"
        },
        vgrid: {
          lineColor: "rgba(0,0,0,0.1)"
        }
      }
    },
    info: {
      enabled: true,
      crosshair: true,
      snap: true,
      aggregations: [],
      style: {
        highlight: {
          fillColor: "rgba(30,160,220,0.15)",
          fadeIn: 200,
          fadeOut: 200
        },
        crosshair: {
          lineColor: "rgba(0,0,0,0.5)",
          lineWidth: 1
        }
      }
    },
    data: {
      name: "default",
      units: ["s", "m", "h", "d", "M", "y"],
      format: "JSON",
      preloaded: void 0,
      url: null,
      urlByUnit: {},
      dataFunction: null,
      limitStart: void 0,
      limitEnd: void 0,
      requestMaxUnits: 10000,
      requestTimeout: 10000,
      prefetchRatio: 1,
      cacheSize: 1000000,
      serverTime: void 0,
      timeOffset: 0
    },
    toolbars: {
      "default": "toolbarBare",
      enabled: ["toolbar", "toolbarBare"],
      logScale: true,
      displayUnit: true,
      periodSelection: true,
      backButton: true,
      zoomOutButton: true,
      "export": true,
      advanced: {
        periods: [
          {
            name: "Last second",
            displayAnchor: "now",
            displayPeriod: "1 s",
            displayUnit: "25 ms"
          }, {
            name: "Last minute",
            displayAnchor: "now",
            displayPeriod: "1 m",
            displayUnit: "1 s"
          }, {
            name: "Last hour",
            displayAnchor: "now",
            displayPeriod: "1 h",
            displayUnit: "1 m"
          }, {
            name: "Last day",
            displayAnchor: "now",
            displayPeriod: "1 d",
            displayUnit: "1 h"
          }, {
            name: "Last week",
            displayAnchor: "now",
            displayPeriod: "1 w",
            displayUnit: "6 h"
          }, {
            name: "Last month",
            displayAnchor: "now",
            displayPeriod: "1 M",
            displayUnit: "1 d"
          }, {
            name: "Last year",
            displayAnchor: "now",
            displayPeriod: "1 y",
            displayUnit: "1 M"
          }, {
            name: "All data",
            displayAnchor: "now",
            displayPeriod: "max",
            displayUnit: "auto"
          }
        ],
        displayUnit: {
          dynamic: false
        },
        exportProxyURL: "http://developers.dvsl.co/export"
      }
    },
    localization: {
      timeUnitsNames: {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        "w": "week",
        M: "month",
        y: "year"
      },
      timeUnitsNamesPlural: {
        ms: "milliseconds",
        s: "seconds",
        m: "minutes",
        h: "hours",
        d: "days",
        "w": "weeks",
        M: "months",
        y: "years"
      },
      weekdays: ["Su", "Mon", "Tue", "Wed", "Thu", "Fri", "Sa"],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      custom: "Custom",
      valueUnits: {
        "K": 1e3,
        "M": 1e6,
        "G": 1e9,
        "T": 1e12,
        "E": 1e15
      },
      firstDayOfWeek: 0,
      holidays: [],
      markerDates: {
        timeFormats: {
          ms: "",
          s: "ss.SSS",
          m: "HH:mm:ss",
          h: "HH:mm",
          d: "D, HH:mm",
          w: "MMM D",
          M: "MMM D",
          y: "YYYY, MMM D"
        }
      },
      infoDates: {
        majorTimeFormats: {
          y: null,
          M: "YYYY",
          w: "YYYY",
          d: "YYYY",
          h: "MMM D, YYYY",
          m: "MMM D, YYYY",
          s: "MMM D, YYYY",
          ms: "MMM D, YYYY"
        },
        minorTimeFormats: {
          y: "YYYY",
          M: "MMM",
          w: "[Week] W",
          d: "MMM D",
          h: "HH:mm",
          m: "HH:mm",
          s: "HH:mm:ss",
          ms: "ss.SSS"
        },
        fullTimeFormats: {
          ms: "MMM D, YYYY HH:mm:ss",
          s: "MMM D, YYYY HH:mm:ss",
          m: "MMM D, YYYY",
          h: "MMM D, YYYY HH:00",
          d: "MMM D, YYYY",
          w: "[Week] W, YYYY",
          M: "MMM YYYY",
          y: "YYYY"
        }
      },
      timeAxisDates: {
        minorLabelTimeFormats: {
          ms: "ss.SSS",
          s: "HH:mm:ss",
          m: "HH:mm",
          h: "HH:00",
          d: "MMM D",
          w: "MMM D",
          M: "MMM",
          y: "YYYY"
        },
        majorLabelTimeFormats: {
          ms: "MMM D, YYYY HH:mm:ss",
          s: "MMM D, YYYY HH:mm:ss",
          m: "MMM D, YYYY",
          h: "MMM D, YYYY HH:00",
          d: "MMM D, YYYY",
          w: "[Week] W, YYYY",
          M: "MMM YYYY",
          y: "YYYY"
        }
      },
      noDataLabel: "No data",
      loadingLabel: "Loading"
    },
    events: {
      onClick: void 0,
      onDoubleClick: void 0,
      onTimeChange: void 0,
      onAnimationDone: void 0,
      timeChangeEventDelay: 500
    },
    /* FOLLOWING SETTINGS SHOULD BE CHANGED WITH CAUTION!*/

    interaction: {
      snapMode: "displayUnit",
      swipeSensitivity: 0.6,
      animationDelay: 500,
      selection: {
        enabled: true,
        grabThreshold: 5
      },
      scrolling: {
        enabled: true,
        swipePageFlipping: true,
        keyboardScrollingFactor: 1,
        noData: "snapBack",
        noDataSnapBackProportion: 0.5
      },
      zooming: {
        enabled: true,
        wheel: false,
        swipe: true,
        fingers: true,
        sensitivity: 1,
        keyboardFactor: 2,
        upDownTreshold: 10
      }
    },
    advanced: {
      timeUpdateInterval: 1000,
      dataUpdateInterval: null,
      maxUnitsToDisplay: 20000,
      includePartialUnits: true,
      zoomHighlightThreshold: 1.5,
      scrollingFriction: 2,
      maxZoomOutFactor: 1.5,
      builtinAssets: {
        "builtin-column": builtinImages["column.png"],
        "builtin-no-data-light": builtinImages["no-data-light.png"],
        "builtin-no-data-dark": builtinImages["no-data-dark.png"]
      },
      assets: ["timechart.css", "jspdf/jspdf.min.js", "jspdf/jspdf.plugin.addimage.min.js"]
    }
  };

  function Timechart_Settings(settings) {
    Timechart_Settings.__super__.constructor.call(this, "timechart");
    this.apply(Timechart_Settings.defaults);
    this.apply(settings);
  }

  Timechart_Settings.prototype.apply = function(settings) {
    var changes, id, s, series, type, v, value, _i, _len, _ref, _ref1;
    changes = Timechart_Settings.__super__.apply.call(this, settings);
    this._calcMinUnit();
    if (Base_Helpers.getProp(this, "area/displayUnits") !== void 0) {
      this.area.displayUnitsParsed = this._parseUnits(this.area.displayUnits);
    }
    if (Base_Helpers.getProp(this, "area/displayPeriods") !== void 0) {
      this.area.displayPeriodsParsed = this._parsePeriods(this.area.displayPeriods);
    }
    if (Base_Helpers.getProp(this, "toolbars/advanced/periods") !== void 0) {
      this.toolbars.advanced.periodsParsed = this._filterPeriods(this.toolbars.advanced.periods);
    }
    if (Base_Helpers.getProp(settings, "data/serverTime") !== void 0) {
      this.data.timeOffset = settings.data.serverTime - new Date().getTime();
    }
    if (changes.stacks) {
      this.computedStacks = {};
      _ref = this.stacks;
      for (id in _ref) {
        value = _ref[id];
        v = {};
        this.applyRec(v, Timechart_Settings.defaults.stacks["default"], {});
        this.applyRec(v, value, {});
        this.computedStacks[id] = v;
      }
    }
    if (changes.series || changes.chartTypes) {
      changes.computedSeries = true;
      this.computedSeries = [];
      _ref1 = this.series;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        series = _ref1[_i];
        if (!Base_Helpers.isObject(series)) {
          continue;
        }
        s = {};
        this.applyRec(s, Timechart_Settings.defaults.series[0], {});
        type = series.type || s.type;
        if (type === "columns" || type === "line") {
          this.applyRec(s, this.chartTypes[type], {});
        } else {
          throw "Settings: Unrecognized series.type = " + type;
        }
        this.applyRec(s, series, {});
        if (!this.valueAxis[s.valueAxis]) {
          throw "Settings: Unrecognized value axis: " + s.valueAxis;
        }
        if (s.data.index === 0) {
          throw "Settings: series.data.index = 0, not allowed";
        }
        this.computedSeries.push(s);
      }
    }
    return changes;
  };

  Timechart_Settings.prototype.getValueAxisList = function() {
    return [this.valueAxis["default"], this.valueAxis.secondary];
  };

  Timechart_Settings.prototype._parseUnits = function(unitList) {
    var r, s, t, _i, _len;
    r = [];
    for (_i = 0, _len = unitList.length; _i < _len; _i++) {
      s = unitList[_i];
      t = Base_TimeStep.parse(s);
      if (t === null) {
        Base_Helpers.error("Settings: unknown time unit '" + s + "'");
      } else if (this.area.minUnit.isSmallerOrEqual(t)) {
        r.push(t);
      }
    }
    return r;
  };

  Timechart_Settings.prototype._parsePeriods = function(unitList) {
    var p, r, s, u, x, _i, _len;
    r = [];
    for (_i = 0, _len = unitList.length; _i < _len; _i++) {
      s = unitList[_i];
      x = Base_Helpers.clone(s);
      x.displayUnit = u = Base_TimeStep.parse(s.displayUnit);
      x.displayPeriod = p = Base_TimeStep.parse(s.displayPeriod);
      if ((p === null || this.area.minUnit.isSmallerOrEqual(p)) && (u === null || this.area.minUnit.isSmallerOrEqual(u))) {
        r.push(x);
      }
    }
    return r;
  };

  Timechart_Settings.prototype._filterPeriods = function(list) {
    var p, r, s, u, _i, _len;
    r = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      s = list[_i];
      u = Base_TimeStep.parse(s.displayUnit);
      p = Base_TimeStep.parse(s.displayPeriod);
      if ((p === null || this.area.minUnit.isSmallerOrEqual(p)) && (u === null || this.area.minUnit.isSmallerOrEqual(u))) {
        r.push(s);
      }
    }
    return r;
  };

  Timechart_Settings.prototype._calcMinUnit = function() {
    var minUnit, minUnit2, s, ss, _i, _j, _len, _len1, _ref, _ref1;
    if (!((this.area != null) && (this.data != null) && (this.area.displayUnits != null) && (this.data.units != null))) {
      return;
    }
    minUnit = new Base_TimeStep("y", 1e6);
    _ref = this.area.displayUnits;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      s = _ref[_i];
      ss = Base_TimeStep.parse(s);
      if (ss.isSmaller(minUnit)) {
        minUnit = ss;
      }
    }
    minUnit2 = new Base_TimeStep("y", 1e6);
    _ref1 = this.data.units;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      s = _ref1[_j];
      ss = new Base_TimeStep(s, 1);
      if (ss.isSmaller(minUnit2)) {
        minUnit2 = ss;
      }
    }
    if (minUnit2.isBigger(minUnit)) {
      minUnit = minUnit2;
    }
    return this.area.minUnit = minUnit;
  };

  return Timechart_Settings;

})(Base_Settings);

/*
//@ sourceMappingURL=Settings.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Series_Stack;

Timechart_Series_Stack = (function() {
  function Timechart_Series_Stack(renderer, cluster, options, va) {
    this.renderer = renderer;
    this.cluster = cluster;
    this.options = options;
    this.va = va;
    this.va.series++;
    this.scene = this.renderer.scene;
    this.dataWarehouse = this.renderer.dataWarehouse;
    this.dataRequests = [];
    this.series = [];
    this.minWidth = 0;
    this.min = 0;
    this.max = 0;
    this.renderingType = null;
    this.maxWidth = Infinity;
    this.needsAfterProcess = false;
    this.centers = [];
    this.radii = [];
    this.vstack = [];
    this.ystack = [];
    this.xes = [];
    this.times = [];
    this.styles = [];
    this.calculatedDepth = 0;
  }

  Timechart_Series_Stack.prototype.addSeries = function(seriesOptions) {
    this.series.push(seriesOptions);
    this.dataRequests.push(this.dataWarehouse.registerDataProcessingRequest(seriesOptions.data));
    return this.calculatedDepth = Math.max(this.calculatedDepth, seriesOptions.style.depth);
  };

  Timechart_Series_Stack.prototype.afterInit = function() {
    var max, min, series, _i, _len, _ref;
    this.renderingType = this.series[0].type;
    if (this.renderingType === "line") {
      this.renderer = new Timechart_Renderer_Line(this.scene, this.renderer);
    } else {
      this.renderer = new Timechart_Renderer_Columns(this.scene, this.renderer);
    }
    min = 1;
    max = Infinity;
    _ref = this.series;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      series = _ref[_i];
      min = Math.max(min, series.style.minWidth);
      max = Math.min(max, series.style.maxWidth);
    }
    this.minWidth = min;
    return this.maxWidth = max;
  };

  Timechart_Series_Stack.prototype.remove = function() {
    var requestId, _i, _len, _ref, _results;
    this.va.series -= 1;
    _ref = this.dataRequests;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      requestId = _ref[_i];
      _results.push(this.dataWarehouse.removeDataProcessingRequest(requestId));
    }
    return _results;
  };

  Timechart_Series_Stack.prototype.process = function(event) {
    var changes;
    changes = event.changes;
    if (!(changes.time || changes.data || changes.displayUnit || changes.bounds || !this.dataRequests.length)) {
      return;
    }
    this.getAndProcessData();
    this.computeMinMax();
    this.addLeads();
    return this.needsAfterProcess = true;
  };

  Timechart_Series_Stack.prototype.afterProcess = function(event) {
    var changes;
    changes = event.changes;
    if (this.needsAfterProcess || this.va.axisChanged) {
      this.needsAfterProcess = false;
      return this.computeY();
    }
  };

  Timechart_Series_Stack.prototype.paint = function(context) {
    var i, _i, _ref, _results;
    if (!(this.ystack.length > 0)) {
      return;
    }
    if (this.options.type === "based") {
      _results = [];
      for (i = _i = 0, _ref = this.series.length - 1; _i <= _ref; i = _i += 1) {
        _results.push(this.renderer.paintStack(context, [this.series[i]], this.centers, this.radii, [this.ystack[i]], this.va.absoluteMidpoint));
      }
      return _results;
    } else {
      if (this.ystackNegative) {
        this.renderer.paintStack(context, this.series, this.centers, this.radii, this.ystackNegative, this.va.absoluteMidpoint);
      }
      return this.renderer.paintStack(context, this.series, this.centers, this.radii, this.ystack, this.va.absoluteMidpoint);
    }
  };

  Timechart_Series_Stack.prototype.getAndProcessData = function() {
    var requestId, slice, w, _i, _len, _ref, _results;
    w = this.dataWarehouse;
    this.vstack = [];
    slice = w.getData(this.dataRequests[0]);
    if (slice.times.length === 0) {
      return;
    }
    this.xes = slice.xes.slice(slice.fromIndex, slice.toIndex);
    this.times = slice.times.slice(slice.fromIndex, slice.toIndex);
    this.centers = new Array(this.xes.length - 1);
    this.radii = new Array(this.xes.length - 1);
    this.cluster.computeStackCenterRadius(this, this.xes, this.centers, this.radii);
    _ref = this.dataRequests;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      requestId = _ref[_i];
      slice = w.getData(requestId);
      _results.push(this.vstack.push(slice.values.slice(slice.fromIndex, slice.toIndex - 1)));
    }
    return _results;
  };

  Timechart_Series_Stack.prototype.addLeads = function() {
    var i, requestId, slice, _i, _len, _ref, _results;
    _ref = this.dataRequests;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      requestId = _ref[i];
      1;
      slice = this.dataWarehouse.getData(requestId);
      if (slice.leadIn) {
        this.injectLead(slice.leadIn, i);
      }
      if (slice.leadOut) {
        _results.push(this.injectLead(slice.leadOut, i));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Timechart_Series_Stack.prototype.injectLead = function(lead, dataIndex) {
    var center, count, i, j, rad, t0, val, _i, _ref;
    count = this.dataRequests.length;
    val = lead.values[0];
    t0 = lead.times[0];
    center = [0];
    rad = [0];
    this.cluster.computeStackCenterRadius(this, lead.xes, center, rad);
    center = center[0];
    rad = rad[0];
    i = 0;
    while (i < this.centers.length && this.centers[i] < center) {
      i++;
    }
    if (i === this.centers.length || this.centers[i] > center) {
      this.centers.splice(i, 0, center);
      this.radii.splice(i, 0, rad);
      this.times.splice(i, 0, t0);
      for (j = _i = 0, _ref = count - 1; _i <= _ref; j = _i += 1) {
        this.vstack[j].splice(i, 0, null);
      }
    }
    return this.vstack[dataIndex][i] = val;
  };

  Timechart_Series_Stack.prototype.computeMinMax = function() {
    var i, j, len, max, maxs, min, mins, s, stacks, type, v, vstack, _i, _j, _k, _l, _len, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    min = Infinity;
    max = -Infinity;
    if (this.vstack.length > 0) {
      vstack = this.vstack;
      len = vstack[0].length;
      stacks = vstack.length;
      type = this.options.type;
      if (type === "proportional") {
        min = 0;
        max = 100;
      } else if (stacks === 1) {
        _ref = vstack[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          if (v !== null) {
            min = Math.min(min, v);
            max = Math.max(max, v);
          }
        }
      } else if (type === "based") {
        for (i = _j = 0, _ref1 = len - 1; _j <= _ref1; i = _j += 1) {
          for (j = _k = 0, _ref2 = stacks - 1; _k <= _ref2; j = _k += 1) {
            v = vstack[j][i];
            if (v !== null) {
              min = Math.min(min, v);
              max = Math.max(max, v);
            }
          }
        }
      } else if (type === "normal" && this.renderingType === "line") {
        for (i = _l = 0, _ref3 = len - 1; _l <= _ref3; i = _l += 1) {
          s = 0;
          for (j = _m = 0, _ref4 = stacks - 1; _m <= _ref4; j = _m += 1) {
            v = vstack[j][i];
            if (v !== null) {
              s += v;
            }
            min = Math.min(min, s);
            max = Math.max(max, s);
          }
        }
      } else if (type === "normal" && this.renderingType === "columns") {
        for (i = _n = 0, _ref5 = len - 1; _n <= _ref5; i = _n += 1) {
          mins = 0;
          maxs = 0;
          for (j = _o = 0, _ref6 = stacks - 1; _o <= _ref6; j = _o += 1) {
            v = vstack[j][i];
            if (v > 0) {
              maxs += v;
            } else if (v < 0) {
              mins += v;
            }
            min = Math.min(min, mins);
            max = Math.max(max, maxs);
          }
        }
      } else {
        throw "stack.type unknown value: " + type;
      }
    }
    this.min = min;
    this.max = max;
    if (min <= max) {
      return this.va.recieveSeriesGeometry(min, max, this.calculatedDepth);
    } else {
      return this.va.recieveSeriesGeometry(void 0, void 0, this.calculatedDepth);
    }
  };

  Timechart_Series_Stack.prototype.computeY = function() {
    var count, i, j, minHeight, negv, posv, stacks, sum, type, v, va, values, vstack, vv, y, ys, ystack, ystackNeg, _i, _j, _k, _l, _len, _len1, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    if (this.vstack.length === 0) {
      return;
    }
    type = this.options.type;
    vstack = this.vstack;
    stacks = vstack.length;
    count = vstack[0].length;
    va = this.va;
    ystackNeg = null;
    if (type === "proportional") {
      ystack = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = vstack.length; _i < _len; _i++) {
          i = vstack[_i];
          _results.push([]);
        }
        return _results;
      })();
      for (i = _i = 0, _ref = count - 1; _i <= _ref; i = _i += 1) {
        sum = 0;
        for (j = _j = 0, _ref1 = stacks - 1; _j <= _ref1; j = _j += 1) {
          v = vstack[j][i];
          if (v !== null) {
            sum += Math.abs(v);
          }
        }
        if (sum > 0) {
          sum *= 0.01;
          vv = 0;
          for (j = _k = 0, _ref2 = stacks - 1; _k <= _ref2; j = _k += 1) {
            v = vstack[j][i];
            if (v !== null) {
              vv += Math.abs(v);
              ystack[j].push(va.valueToRelativeY(vv / sum));
            } else {
              ystack[j].push(null);
            }
          }
        } else {
          for (j = _l = 0, _ref3 = stacks - 1; _l <= _ref3; j = _l += 1) {
            ystack[j].push(null);
          }
        }
      }
    } else if (type === "based" || stacks === 1) {
      ystack = [];
      for (j = _m = 0, _len = vstack.length; _m < _len; j = ++_m) {
        values = vstack[j];
        ys = new Array(count);
        minHeight = this.series[j].style.minHeight || 0;
        for (i = _n = 0, _len1 = values.length; _n < _len1; i = ++_n) {
          v = values[i];
          if (v !== null) {
            y = va.valueToRelativeY(v);
            if (y > 0) {
              y = Math.max(y, minHeight);
            } else {
              y = Math.min(y, -minHeight);
            }
            ys[i] = y;
          } else {
            ys[i] = null;
          }
        }
        ystack.push(ys);
      }
    } else if (type === "normal" && this.renderingType === "columns" && (this.min < 0 && this.max > 0)) {
      ystack = (function() {
        var _len2, _o, _results;
        _results = [];
        for (_o = 0, _len2 = vstack.length; _o < _len2; _o++) {
          i = vstack[_o];
          _results.push([]);
        }
        return _results;
      })();
      ystackNeg = (function() {
        var _len2, _o, _results;
        _results = [];
        for (_o = 0, _len2 = vstack.length; _o < _len2; _o++) {
          i = vstack[_o];
          _results.push([]);
        }
        return _results;
      })();
      for (i = _o = 0, _ref4 = count - 1; _o <= _ref4; i = _o += 1) {
        negv = 0;
        posv = 0;
        for (j = _p = 0, _ref5 = stacks - 1; _p <= _ref5; j = _p += 1) {
          v = vstack[j][i];
          if (v > 0) {
            posv += v;
            ystack[j].push(va.valueToRelativeY(posv));
            ystackNeg[j].push(null);
          } else if (v < 0) {
            negv += v;
            ystack[j].push(null);
            ystackNeg[j].push(va.valueToRelativeY(negv));
          } else {
            ystack[j].push(null);
            ystackNeg[j].push(null);
          }
        }
      }
    } else if (type === "normal") {
      ystack = (function() {
        var _len2, _q, _results;
        _results = [];
        for (_q = 0, _len2 = vstack.length; _q < _len2; _q++) {
          i = vstack[_q];
          _results.push([]);
        }
        return _results;
      })();
      for (i = _q = 0, _ref6 = count - 1; _q <= _ref6; i = _q += 1) {
        vv = 0;
        for (j = _r = 0, _ref7 = stacks - 1; _r <= _ref7; j = _r += 1) {
          v = vstack[j][i];
          if (v !== null) {
            vv += v;
            ystack[j].push(va.valueToRelativeY(vv));
          } else {
            ystack[j].push(null);
          }
        }
      }
    } else {
      throw "stack.type unknown value: " + type;
    }
    this.ystackNegative = ystackNeg;
    return this.ystack = ystack;
  };

  Timechart_Series_Stack.prototype.exportData = function(from, to) {
    var avg, change, config, count, data, first, fromIndex, i, k, last, max, min, results, sum, times, toIndex, v, values, x, _i, _j, _k, _len, _len1, _ref, _ref1;
    if (this.times && this.vstack) {
      times = this.times;
      count = this.centers.length;
      i = 0;
      while (i < count && times[i + 1] <= from) {
        i++;
      }
      fromIndex = i;
      while (i < count && times[i + 1] < to) {
        i++;
      }
      toIndex = i;
      results = [];
      _ref = this.vstack;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        values = _ref[_i];
        sum = 0;
        max = -Infinity;
        min = Infinity;
        first = null;
        last = null;
        count = 0;
        for (i = _j = fromIndex; _j <= toIndex; i = _j += 1) {
          v = values[i];
          if (v !== null) {
            sum += v;
            max = Math.max(max, v);
            min = Math.min(min, v);
            if (first === null) {
              first = v;
            }
            last = v;
            count += 1;
          }
        }
        if (count > 0) {
          if (count > 0) {
            avg = Math.round(sum / count * 100) / 100;
          }
          change = last - first;
          results.push({
            sum: sum,
            max: max,
            min: min,
            first: first,
            last: last,
            count: count,
            avg: avg,
            change: change
          });
        } else {
          results.push(null);
        }
      }
    } else {
      results = (function() {
        var _k, _len1, _ref1, _results;
        _ref1 = this.series;
        _results = [];
        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
          x = _ref1[_k];
          _results.push(null);
        }
        return _results;
      }).call(this);
    }
    data = [];
    _ref1 = this.series;
    for (k = _k = 0, _len1 = _ref1.length; _k < _len1; k = ++_k) {
      config = _ref1[k];
      data.push({
        name: config.name != null ? config.name : "",
        values: results[k],
        config: config
      });
    }
    return {
      name: this.options.name,
      data: data
    };
  };

  return Timechart_Series_Stack;

})();

/*
//@ sourceMappingURL=Stack.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Series_Cluster;

Timechart_Series_Cluster = (function() {
  function Timechart_Series_Cluster(renderer) {
    this.renderer = renderer;
    this.stacks = [];
    this.idToStack = {};
    this.paddingSum = 0;
    this.minWidth = 0;
    this.maxWidth = Infinity;
  }

  Timechart_Series_Cluster.prototype.addSeries = function(seriesConfig, stackConfig, valueAxis) {
    var stack, stackId;
    if (seriesConfig.stack) {
      stackId = seriesConfig.stack + "#" + seriesConfig.type;
      stack = this.idToStack[stackId];
      if (!stack) {
        stack = this.idToStack[stackId] = new Timechart_Series_Stack(this.renderer, this, stackConfig, valueAxis);
        this.stacks.push(stack);
      }
    } else {
      stack = new Timechart_Series_Stack(this.renderer, this, stackConfig, valueAxis);
      this.stacks.push(stack);
    }
    return stack.addSeries(seriesConfig);
  };

  Timechart_Series_Cluster.prototype.afterInit = function() {
    var max, min, stack, _i, _len, _ref;
    min = 0;
    max = 0;
    _ref = this.stacks;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stack = _ref[_i];
      stack.afterInit();
      min += stack.minWidth;
      max += stack.maxWidth;
    }
    this.minWidth = min;
    return this.maxWidth = max;
  };

  Timechart_Series_Cluster.prototype.remove = function() {
    var stack, _i, _len, _ref, _results;
    _ref = this.stacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stack = _ref[_i];
      _results.push(stack.remove());
    }
    return _results;
  };

  Timechart_Series_Cluster.prototype.process = function(event) {
    var stack, _i, _len, _ref, _results;
    _ref = this.stacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stack = _ref[_i];
      _results.push(stack.process(event));
    }
    return _results;
  };

  Timechart_Series_Cluster.prototype.afterProcess = function(event) {
    var stack, _i, _len, _ref, _results;
    _ref = this.stacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stack = _ref[_i];
      _results.push(stack.afterProcess(event));
    }
    return _results;
  };

  Timechart_Series_Cluster.prototype.paint = function(context) {
    var stack, _i, _len, _ref, _results;
    _ref = this.stacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stack = _ref[_i];
      _results.push(stack.paint(context));
    }
    return _results;
  };

  Timechart_Series_Cluster.prototype.exportData = function(from, to, result) {
    var s, _i, _len, _ref, _results;
    _ref = this.stacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      s = _ref[_i];
      _results.push(result.push(s.exportData(from, to)));
    }
    return _results;
  };

  Timechart_Series_Cluster.prototype.computeStackCenterRadius = function(stack, xes, center, radius) {
    var after, centerCoef, i, minAfter, minBefore, minThis, radiusCoef, s, sum, width, x, _i, _j, _len, _ref, _ref1, _results;
    minBefore = 0;
    minAfter = 0;
    minThis = 0;
    after = false;
    _ref = this.stacks;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      s = _ref[i];
      if (s === stack) {
        minThis = s.minWidth;
        after = true;
      } else if (after) {
        minAfter += s.minWidth;
      } else {
        minBefore += s.minWidth;
      }
    }
    sum = minBefore + minAfter + minThis;
    centerCoef = (minBefore + minThis / 2) / sum;
    radiusCoef = minThis / sum / 2;
    _results = [];
    for (i = _j = 0, _ref1 = xes.length - 2; _j <= _ref1; i = _j += 1) {
      x = xes[i];
      width = xes[i + 1] - x;
      center[i] = x + width * centerCoef;
      _results.push(radius[i] = width * radiusCoef);
    }
    return _results;
  };

  return Timechart_Series_Cluster;

})();

/*
//@ sourceMappingURL=Cluster.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar = (function(_super) {
  __extends(Base_Bar, _super);

  "use strict";

  Base_Bar.prototype.visible = false;

  Base_Bar.prototype.panScene = false;

  Base_Bar.prototype.height = 48;

  Base_Bar.prototype.baseClass = "bar";

  Base_Bar.prototype.relativeClass = "foo";

  Base_Bar.prototype.chart = null;

  Base_Bar.prototype.scene = null;

  function Base_Bar(options, chart) {
    var defaultOptions;
    this.chart = chart;
    this.options = {};
    this.scene = this.chart.scene;
    defaultOptions = {
      align: "scene-x0"
    };
    Base_Helpers.configure(options, defaultOptions);
    Base_Bar.__super__.constructor.call(this, options);
    this.ui.left = Base_Helpers.createDom("ul", Base_Helpers.wrapClass(this, "items,left"), null, this.ui.container);
    this.ui.right = Base_Helpers.createDom("ul", Base_Helpers.wrapClass(this, "items,right"), null, this.ui.container);
    if (!this.visible) {
      this.hide(true, true);
    } else {
      this.show(true, true);
    }
    this.chart.events.addElement(this);
  }

  Base_Bar.prototype.show = function(plain, instant) {
    Base_Bar.__super__.show.call(this, plain, instant);
    if (this.panScene) {
      this.scene.toolbarHeight = this.height;
      return this.chart.updateSize(true);
    }
  };

  Base_Bar.prototype.hide = function(plain, instant) {
    Base_Bar.__super__.hide.call(this, plain, instant);
    this.chart.events.hook("bar-closed");
    if (this.panScene) {
      this.scene.toolbarHeight = 0;
      return this.chart.updateSize(true);
    }
  };

  Base_Bar.prototype.render = function() {
    if (this.parent.items.length > 1) {
      this.addItem(new Base_Bar_CycleButton(), {
        spot: "right"
      });
    }
    return Base_Bar.__super__.render.call(this);
  };

  Base_Bar.prototype.cycleNext = function() {
    if (this.parent.cycleNext) {
      return this.parent.cycleNext(this);
    }
  };

  Base_Bar.prototype.init = function() {
    return Base_Bar.__super__.init.call(this);
  };

  Base_Bar.prototype.onSceneChange = function(ev) {
    if (ev.changes.bounds) {
      if (this.options.align === "scene-x0") {
        this.ui.container.style.left = this.chart.scene.x0 + "px";
      } else if (this.options.align === "valueAxis") {
        this.ui.container.style.left = (this.chart.scene.leftValueAxisSize + 1) + "px";
      }
      return this.ui.container.style.width = this.chart.scene.width + "px";
    }
  };

  return Base_Bar;

})(Base_View);

/*
//@ sourceMappingURL=Bar.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar_Dropdown,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar_Dropdown = (function(_super) {
  __extends(Base_Bar_Dropdown, _super);

  "use strict";

  Base_Bar_Dropdown.prototype.selected = false;

  Base_Bar_Dropdown.prototype.dropdownDefaultOptions = {
    listActiveClass: "dropdown-active",
    onClick: function() {},
    getOptionName: function(o) {
      return o;
    },
    getOptionIdentifier: function(o) {
      return o;
    },
    showTitle: true
  };

  function Base_Bar_Dropdown(options) {
    var defaultOptions;
    this.revData = {};
    defaultOptions = {
      setInitialValue: true,
      data: [],
      hasIcon: null,
      label: null,
      previewPointerDown: this.previewPointerDown
    };
    Base_Helpers.configure(options, defaultOptions);
    Base_Bar_Dropdown.__super__.constructor.call(this, options);
  }

  Base_Bar_Dropdown.prototype.init = function() {
    var first, index, v, _i, _len, _ref,
      _this = this;
    Base_Helpers.configure(this.options, this.dropdownDefaultOptions);
    Base_Bar_Dropdown.__super__.init.call(this);
    this.listActiveClass = Base_Helpers.wrapClass(this.parent, this.options.listActiveClass);
    this.options.activeClass = "whitebg";
    this.activeClass = Base_Helpers.wrapClass(this.parent, this.options.activeClass);
    Base_Helpers.addClass(this.ui.a, Base_Helpers.wrapClass(this.parent, "show-more"));
    this.ui.s = Base_Helpers.createDom("span", null, null, this.ui.a);
    this.ui.list = Base_Helpers.createDom("div", Base_Helpers.wrapClass(this.parent, "dropdown"), null, this.ui.container);
    this.ui.list_ul = Base_Helpers.createDom("ul", null, null, this.ui.list);
    this.ui.list_items = {};
    first = false;
    _ref = this.options.data;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      v = _ref[index];
      if (first === false) {
        first = index;
      }
      this.addOption(this.ui.list_ul, v, index);
    }
    if (this.options.setInitialValue) {
      this.setOption(first);
    }
    this.chart().events.addHook(this, "dropdown-opened", function(hook, args, caller) {
      if (caller.id !== _this.id) {
        return _this.toggleState(true);
      }
    });
    return this.chart().events.addHook(this, "bar-closed", function() {
      return _this.toggleState(true);
    });
  };

  Base_Bar_Dropdown.prototype.toggleState = function(hide) {
    if (!this.active && !hide) {
      this.active = true;
      this.chart().events.hook("dropdown-opened", null, this);
      if (this.activeClass) {
        Base_Helpers.addClass(this.ui.a, this.activeClass);
      }
      return Base_Helpers.fadeIn(this.ui.list);
    } else if (hide || this.active) {
      if (this.active) {
        this.active = false;
        if (this.activeClass) {
          Base_Helpers.removeClass(this.ui.a, this.activeClass);
        }
        return Base_Helpers.fadeOut(this.ui.list);
      }
    }
  };

  Base_Bar_Dropdown.prototype.addOption = function(container, v, index) {
    var c, li, name,
      _this = this;
    if (this.selected === index) {
      c = this.listActiveClass;
    } else {
      c = null;
    }
    li = Base_Helpers.createDom("li", null, null, container);
    name = this.options.getOptionName(v);
    this.ui.list_items[index] = Base_Helpers.createDom("a", c, name, li);
    this.revData[this.options.getOptionIdentifier(v)] = index;
    return Base_Helpers.listen(this.ui.list_items[index], "click", function() {
      return _this.setOption(index);
    });
  };

  Base_Bar_Dropdown.prototype.setOption = function(option, silent) {
    var id, index;
    if (this.options.data[option] != null) {
      index = option;
    } else {
      id = this.options.getOptionIdentifier(option);
      if (!this.revData.hasOwnProperty(id)) {
        console.error("Key not found in data set", id, index, this.id);
        return;
      }
      index = this.revData[id];
    }
    if (this.selected !== false) {
      Base_Helpers.removeClass(this.ui.list_items[this.selected], this.listActiveClass);
    }
    this.selected = index;
    Base_Helpers.addClass(this.ui.list_items[this.selected], this.listActiveClass);
    if (this.options.showTitle) {
      this.ui.p.innerHTML = this.options.getOptionName(this.options.data[this.selected]);
    }
    if (!silent) {
      if (this.options.onChange) {
        this.options.onChange(this);
      }
      return this.toggleState(true);
    }
  };

  Base_Bar_Dropdown.prototype.previewPointerDown = function(ev) {
    var box, l, lh, lw;
    if (this.active) {
      l = Base_Helpers.elementPos(this.ui.list);
      lw = this.ui.list.offsetWidth;
      lh = this.ui.list.offsetHeight;
      box = [l[0], l[1], l[0] + lw, l[1] + lh];
      if (Base_Helpers.isWithIn([ev.x, ev.y], box)) {
        return this.toggleState(true);
      }
    }
  };

  Base_Bar_Dropdown.prototype.onSceneChange = function(ev) {};

  return Base_Bar_Dropdown;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=Dropdown.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Renderer;

Timechart_Renderer = (function() {
  "use strict";
  Timechart_Renderer.prototype.dataWarehouse = null;

  function Timechart_Renderer(chart) {
    var k, v, _ref;
    this.chart = chart;
    this.scene = this.chart.scene;
    this.events = this.chart.events;
    this.imageCache = {};
    this.valueAxis = {};
    this.clusters = [];
    this.loading = true;
    this.animationPriority = 999;
    this.dataWarehouse = new Timechart_DataWarehouse(this, this.chart.settings.dataWarehouse);
    _ref = this.scene.settings.valueAxis;
    for (k in _ref) {
      v = _ref[k];
      this.valueAxis[k] = new Timechart_ValueAxis(this, k, v);
    }
    this.buildSeries();
    this.timeAxis = new Timechart_TimeAxis(this);
    this.shades = new Timechart_DataLimitRenderer(this);
  }

  Timechart_Renderer.prototype.buildSeries = function() {
    var cluster, defaultCluster, defaultStackConfig, idToCluster, lineStackClusters, maxWidth, minWidth, s, series, stack, x, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    _ref = this.clusters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      x.remove();
    }
    idToCluster = {};
    this.clusters = [];
    defaultCluster = null;
    lineStackClusters = {};
    defaultStackConfig = Timechart_Settings.defaults.stacks["default"];
    _ref1 = this.scene.settings.computedSeries;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      series = _ref1[_j];
      if (!series.enabled) {
        continue;
      }
      if (!this.valueAxis.hasOwnProperty(series.valueAxis)) {
        throw "Settings series.valueAxis invalid value: " + series.valueAxis;
      }
      if (series.cluster) {
        cluster = idToCluster[series.cluster];
        if (!cluster) {
          cluster = idToCluster[series.cluster] = new Timechart_Series_Cluster(this);
          this.clusters.push(cluster);
        }
      } else {
        if (series.type === "line") {
          if (series.stack) {
            if (lineStackClusters.hasOwnProperty(series.stack)) {
              cluster = lineStackClusters[series.stack];
            } else {
              cluster = lineStackClusters[series.stack] = new Timechart_Series_Cluster(this);
              this.clusters.push(cluster);
            }
          } else {
            cluster = new Timechart_Series_Cluster(this);
            this.clusters.push(cluster);
          }
        } else {
          if (!defaultCluster) {
            defaultCluster = new Timechart_Series_Cluster(this);
            this.clusters.push(defaultCluster);
          }
          cluster = defaultCluster;
        }
      }
      stack = this.scene.settings.computedStacks[series.stack] || defaultStackConfig;
      cluster.addSeries(series, stack, this.valueAxis[series.valueAxis]);
    }
    minWidth = 1e30;
    maxWidth = 1;
    _ref2 = this.clusters;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      s = _ref2[_k];
      s.afterInit();
      minWidth = Math.min(minWidth, s.minWidth);
      maxWidth = Math.max(maxWidth, s.maxWidth);
    }
    minWidth = Math.min(minWidth, maxWidth);
    this.scene.displayUnitMinSize = minWidth;
    return this.scene.displayUnitMaxSize = maxWidth;
  };

  Timechart_Renderer.prototype.getImage = function(url) {
    var image;
    image = this.imageCache[url];
    if (!image) {
      image = new Image();
      image.src = this.scene.settings.getAssetUrl(url);
      this.imageCache[url] = image;
    }
    if (image.width > 0) {
      return image;
    } else {
      return null;
    }
  };

  Timechart_Renderer.prototype.onSceneChange = function(event) {
    var changes;
    changes = event.changes;
    if (changes.settings && changes.settingsChanges.computedSeries) {
      this.buildSeries();
    }
    if (changes.bounds || changes.settings) {
      changes.scale = true;
      return changes.time = true;
    }
  };

  Timechart_Renderer.prototype.doAnimations = function(event) {
    var changes, name, x, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    changes = event.changes;
    this.dataWarehouse.process(event);
    if (this.scene.displayUnit != null) {
      if (this.displayUnit !== this.scene.displayUnit) {
        this.displayUnit = this.scene.displayUnit;
        changes.displayUnit = true;
      }
      _ref = this.clusters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        x.process(event);
      }
      _ref1 = this.valueAxis;
      for (name in _ref1) {
        x = _ref1[name];
        x.process(event);
      }
      _ref2 = this.clusters;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        x = _ref2[_j];
        x.afterProcess(event);
      }
      _ref3 = this.valueAxis;
      for (name in _ref3) {
        x = _ref3[name];
        x.afterProcess(event);
      }
    }
    if (this.scene.data.noData) {
      this.scene.setMessage("noData", this.scene.settings.localization.noDataLabel, 999);
      this.loading = false;
    } else {
      this.scene.setMessage("noData", null);
    }
    if (this.error != null) {
      this.scene.setMessage(this, this.error, 100);
    } else {
      this.scene.setMessage(this, null);
    }
    return this.scene.loading = this.loading;
  };

  Timechart_Renderer.prototype.paintScene = function(event) {
    var context, h, name, o, w, x, y, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    context = event.context;
    _ref = [this.scene.x0, this.scene.y0, this.scene.width, this.scene.height], x = _ref[0], y = _ref[1], w = _ref[2], h = _ref[3];
    Base_Graphics.pushClip(context, x, y, w, h);
    _ref1 = this.clusters;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      o = _ref1[_i];
      o.paint(context);
    }
    this.shades.paint(context);
    Base_Graphics.popClip(context);
    if (this.scene.displayUnit != null) {
      this.timeAxis.paint(context);
      _ref2 = this.valueAxis;
      for (name in _ref2) {
        o = _ref2[name];
        o.paint(context, context);
      }
    }
    Base_Graphics.pushClip(context, x, y, w, h);
    _ref3 = this.clusters;
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      o = _ref3[_j];
      o.paint(context);
    }
    this.shades.paint(context);
    Base_Graphics.popClip(context);
    this.scene.minorTimeFormat = this.timeAxis.minorFormat;
    this.scene.minorTimeUnit = this.timeAxis.minorTimeUnit;
    this.scene.majorTimeFormat = this.timeAxis.majorFormat;
    return this.scene.majorTimeUnit = this.timeAxis.majorTimeUnit;
  };

  Timechart_Renderer.prototype.exportData = function(from, to) {
    var cluster, result, _i, _len, _ref;
    result = [];
    _ref = this.clusters;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cluster = _ref[_i];
      cluster.exportData(from, to, result);
    }
    return result;
  };

  return Timechart_Renderer;

})();

/*
//@ sourceMappingURL=Renderer.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Infobar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Infobar = (function(_super) {
  __extends(Base_Infobar, _super);

  "use strict";

  Base_Infobar.prototype.relativeClass = "infobar";

  function Base_Infobar(options, chart) {
    var defaultOptions;
    this.chart = chart;
    defaultOptions = {
      align: "valueAxis"
    };
    Base_Helpers.configure(options, defaultOptions);
    Base_Infobar.__super__.constructor.call(this, options, this.chart);
  }

  return Base_Infobar;

})(Base_Bar);

/*
//@ sourceMappingURL=Infobar.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar_Label, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar_Label = (function(_super) {
  __extends(Base_Bar_Label, _super);

  "use strict";

  function Base_Bar_Label() {
    _ref = Base_Bar_Label.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Base_Bar_Label.prototype.defaultLabelOptions = {
    type: "default",
    label: null
  };

  Base_Bar_Label.prototype.active = false;

  Base_Bar_Label.prototype.init = function() {
    var _this = this;
    Base_Bar_Label.__super__.init.call(this);
    Base_Helpers.configure(this.options, this.defaultLabelOptions);
    this.ui.em = Base_Helpers.createDom("em", null, this.options.label, this.ui.container);
    Base_Helpers.addClass(this.ui.em, Base_Helpers.wrapClass(this.parent, "label-" + (this.options.css ? this.options.css : this.options.type) + ",label"));
    if (!this.options.onClick) {
      this.options.onClick = this.defaultOnClick;
    }
    return Base_Helpers.listen(this.ui.em, "click", function(ev) {
      return _this.options.onClick(_this, ev);
    });
  };

  Base_Bar_Label.prototype.defaultOnClick = function(obj, ev) {};

  return Base_Bar_Label;

})(Base_Bar_Item);

/*
//@ sourceMappingURL=Label.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Toolbar, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Toolbar = (function(_super) {
  __extends(Base_Toolbar, _super);

  "use strict";

  function Base_Toolbar() {
    _ref = Base_Toolbar.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Base_Toolbar.prototype.relativeClass = "toolbar";

  Base_Toolbar.prototype.panScene = true;

  return Base_Toolbar;

})(Base_Bar);

/*
//@ sourceMappingURL=Toolbar.map
*/

// Generated by CoffeeScript 1.6.3
var Base_Bar_ButtonSet,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base_Bar_ButtonSet = (function(_super) {
  __extends(Base_Bar_ButtonSet, _super);

  "use strict";

  Base_Bar_ButtonSet.prototype.buttonMode = null;

  function Base_Bar_ButtonSet(options) {
    var d;
    d = {
      buttonMode: "one"
    };
    Base_Helpers.extend(d, options);
    Base_Bar_ButtonSet.__super__.constructor.call(this, d);
  }

  Base_Bar_ButtonSet.prototype.addItem = function(obj, options) {
    obj.options.bare = true;
    obj.ui.container = this.ui.container;
    Base_Bar_ButtonSet.__super__.addItem.call(this, obj, options);
    return obj;
  };

  Base_Bar_ButtonSet.prototype.render = function() {
    return this.ui.container;
  };

  Base_Bar_ButtonSet.prototype.toggleState = function(obj) {
    var mode, v, _i, _len, _ref;
    if (this.options.buttonMode === "one") {
      mode = obj.active ? true : false;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        v.obj.toggleState(true);
      }
      return obj.toggleState(mode);
    } else if (this.options.buttonMode === "none") {

    } else if (this.options.buttonMode === "multi") {
      return obj.toggleState();
    }
  };

  return Base_Bar_ButtonSet;

})(Base_Bar_Item);

/*
//@ sourceMappingURL=ButtonSet.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar = (function(_super) {
  __extends(Timechart_Bar, _super);

  function Timechart_Bar() {
    _ref = Timechart_Bar.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Timechart_Bar;

})(Base_Bar);

/*
//@ sourceMappingURL=Bar.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_LinLogButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_LinLogButton = (function(_super) {
  __extends(Timechart_Bar_LinLogButton, _super);

  function Timechart_Bar_LinLogButton(options) {
    var _this = this;
    this.options = {
      type: "lin",
      activeClass: null,
      label: "Lin",
      title: "Switch lin/log scale",
      onClick: function() {
        if (_this.chart().scene.settings.valueAxis["default"].logScale === true) {
          return _this.chart().updateSettings({
            valueAxis: {
              "default": {
                logScale: false
              },
              secondary: {
                logScale: false
              }
            }
          }, "user");
        } else {
          return _this.chart().updateSettings({
            valueAxis: {
              "default": {
                logScale: true
              },
              secondary: {
                logScale: true
              }
            }
          }, "user");
        }
      },
      onSceneChange: function(ev) {
        return _this.update(ev);
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_LinLogButton.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_LinLogButton.prototype.init = function() {
    Timechart_Bar_LinLogButton.__super__.init.call(this);
    return this.update(null, true);
  };

  Timechart_Bar_LinLogButton.prototype.update = function(ev, fts) {
    var scene;
    if (fts || Base_Helpers.getProp(ev, "changes/settingsChanges/valueAxis/default/logScale") !== void 0) {
      scene = this.chart().scene;
      if (scene.settings.valueAxis["default"].logScale) {
        Base_Helpers.removeClass(this.ui.a, Base_Helpers.wrapClass(this.parent, "btn-lin"));
        return Base_Helpers.addClass(this.ui.a, Base_Helpers.wrapClass(this.parent, "btn-log"));
      } else {
        Base_Helpers.removeClass(this.ui.a, Base_Helpers.wrapClass(this.parent, "btn-log"));
        return Base_Helpers.addClass(this.ui.a, Base_Helpers.wrapClass(this.parent, "btn-lin"));
      }
    }
  };

  return Timechart_Bar_LinLogButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=LinLogButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_ExportDropdown,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_ExportDropdown = (function(_super) {
  __extends(Timechart_Bar_ExportDropdown, _super);

  function Timechart_Bar_ExportDropdown(options) {
    var _this = this;
    this.options = {
      css: "export",
      title: "Export Data",
      setInitialValue: false,
      getOptionName: (function(o) {
        return o.name;
      }),
      getOptionIdentifier: (function(o) {
        return o.toString();
      }),
      onChange: function(obj) {
        var a4, dh, doc, dpi, dw, h, k, o, out, p, pdf, ph, pw, s, scale, v, w;
        k = obj.selected;
        v = _this.options.data[k];
        console.log(v.format, v.type);
        if (v.format === "image") {
          out = _this.parent.chart.api.exportImage(v.scaling, v.type, v.transparent);
          _this.proxyExport(v.type, out, "base64");
        }
        if (v.format === "pdf") {
          s = _this.parent.chart.api.getSize();
          p = [10, 10, 10, 10];
          a4 = [];
          pw = ph = 0;
          dw = dh = 0;
          dpi = 72;
          scale = 1;
          w = h = 0;
          if (s[0] >= s[1]) {
            a4 = [297, 210];
            o = "l";
          } else {
            a4 = [210, 297];
            o = "p";
          }
          pw = a4[0] / 25.4 * dpi;
          ph = a4[1] / 25.4 * dpi;
          scale = Math.min(ph / s[1], pw / s[0]);
          if (o === "l") {
            w = s[0] * scale / pw * a4[0] - p[1] - p[3];
            dw = (a4[0] - w - p[1] - p[3]) / 2;
            h = s[1] / s[0] * w;
            dh = (a4[1] - p[0] - p[2] - h) / 2;
          } else {
            h = s[1] * scale / ph * a4[1] - p[0] - p[2];
            dh = (a4[1] - h - p[0] - p[2]) / 2;
            w = s[0] / s[1] * h;
            dw = (a4[0] - p[1] - p[3] - w) / 2;
          }
          out = _this.parent.chart.api.exportImage(scale * 3, "image/jpeg", v.transparent);
          out = out.slice('data:image/jpeg;base64,'.length);
          out = atob(out);
          doc = new jsPDF(o, "mm", "a4");
          doc.addImage(out, 'JPEG', p[3] + dw, p[0] + dh, w, h);
          pdf = doc.output('datauristring');
          return _this.proxyExport("application/pdf", pdf, "base64");
        }
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_ExportDropdown.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_ExportDropdown.prototype.init = function() {
    this.options.data = [
      {
        name: "For Office and Web (jpeg)",
        format: "image",
        type: "image/jpeg",
        scaling: 1,
        transparent: false
      }, {
        name: "For Photoshop (png)",
        format: "image",
        type: "image/png",
        scaling: 3,
        transparent: true
      }, {
        name: "For Printer (pdf)",
        format: "pdf",
        type: "application/pdf",
        transparent: false
      }
    ];
    return Timechart_Bar_ExportDropdown.__super__.init.call(this);
  };

  Timechart_Bar_ExportDropdown.prototype.proxyExport = function(type, data, encoding) {
    var f, f1, f2, f3;
    f = Base_Helpers.createDom("form");
    f.setAttribute("action", this.parent.chart.settings.toolbars.advanced.exportProxyURL);
    f.setAttribute("method", "POST");
    f.setAttribute("style", "display:none");
    f1 = Base_Helpers.createDom("input", null, null, f);
    f1.setAttribute("type", "hidden");
    f1.setAttribute("name", "type");
    f1.setAttribute("value", type);
    f2 = Base_Helpers.createDom("input", null, null, f);
    f2.setAttribute("type", "hidden");
    f2.setAttribute("name", "encoding");
    f2.setAttribute("value", encoding);
    f3 = Base_Helpers.createDom("input", null, null, f);
    f3.setAttribute("type", "hidden");
    f3.setAttribute("name", "data");
    f3.setAttribute("value", data);
    return f.submit();
  };

  return Timechart_Bar_ExportDropdown;

})(Base_Bar_Dropdown);

/*
//@ sourceMappingURL=ExportDropdown.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_PeriodButton, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_PeriodButton = (function(_super) {
  __extends(Timechart_Bar_PeriodButton, _super);

  function Timechart_Bar_PeriodButton() {
    _ref = Timechart_Bar_PeriodButton.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Timechart_Bar_PeriodButton.prototype.setOption = function() {
    return this.chart().setDisplayPeriod(this.options.period, "now");
  };

  return Timechart_Bar_PeriodButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=PeriodButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_LinLogLabel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_LinLogLabel = (function(_super) {
  __extends(Timechart_Bar_LinLogLabel, _super);

  function Timechart_Bar_LinLogLabel(options) {
    var _this = this;
    this.options = {
      type: "scale",
      enclosureClass: "enc-bare",
      onSceneChange: function(ev) {
        var p;
        if ((p = Base_Helpers.getProp(ev, "changes/settingsChanges/valueAxis/default/logScale")) !== void 0) {
          if (p) {
            _this.ui.em.innerHTML = "Log";
            Base_Helpers.removeClass(_this.ui.em, Base_Helpers.wrapClass(_this.parent, "label-lin"));
            return Base_Helpers.addClass(_this.ui.em, Base_Helpers.wrapClass(_this.parent, "label-log"));
          } else {
            _this.ui.em.innerHTML = "Lin";
            Base_Helpers.removeClass(_this.ui.em, Base_Helpers.wrapClass(_this.parent, "label-log"));
            return Base_Helpers.addClass(_this.ui.em, Base_Helpers.wrapClass(_this.parent, "label-lin"));
          }
        }
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_LinLogLabel.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_LinLogLabel.prototype.init = function() {
    var s;
    s = this.chart().scene.settings.valueAxis["default"].logScale;
    this.options.label = s ? "Log" : "Lin";
    this.options.css = s ? "log" : "lin";
    return Timechart_Bar_LinLogLabel.__super__.init.call(this);
  };

  return Timechart_Bar_LinLogLabel;

})(Base_Bar_Label);

/*
//@ sourceMappingURL=LinLogLabel.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_PeriodLabel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_PeriodLabel = (function(_super) {
  __extends(Timechart_Bar_PeriodLabel, _super);

  function Timechart_Bar_PeriodLabel(options) {
    this.options = {
      label: "",
      type: "period",
      css: "bars",
      enclosureClass: "enc-bare"
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_PeriodLabel.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_PeriodLabel.prototype.init = function() {
    var _this = this;
    this.chart().on("timeChange", function(ev) {
      return _this.updateOption(ev, 1);
    });
    return Timechart_Bar_PeriodLabel.__super__.init.call(this);
  };

  Timechart_Bar_PeriodLabel.prototype.updateOption = function(ev, fts) {
    var chart, found, k, n, name, v, _i, _len, _ref;
    chart = this.chart();
    if (!(Base_Helpers.getProp(ev, "changes/time") || fts)) {
      return;
    }
    found = false;
    _ref = chart.settings.toolbars.advanced.periodsParsed;
    for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
      v = _ref[k];
      if (chart.isThisDisplayPeriod(v.displayPeriod, v.displayAnchor)) {
        n = k;
        found = true;
        break;
      }
    }
    if (!found) {
      name = chart.settings.localization.custom;
    } else {
      name = chart.settings.toolbars.advanced.periodsParsed[n].name;
    }
    return this.ui.em.innerHTML = name;
  };

  return Timechart_Bar_PeriodLabel;

})(Base_Bar_Label);

/*
//@ sourceMappingURL=PeriodLabel.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_DisplayUnitLabel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_DisplayUnitLabel = (function(_super) {
  __extends(Timechart_Bar_DisplayUnitLabel, _super);

  function Timechart_Bar_DisplayUnitLabel(options) {
    var _this = this;
    this.options = {
      label: "",
      type: "displayunit",
      css: "bars",
      enclosureClass: "enc-bare",
      onSceneChange: function(ev) {
        return _this.updateOption(ev);
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_DisplayUnitLabel.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_DisplayUnitLabel.prototype.init = function() {
    return Timechart_Bar_DisplayUnitLabel.__super__.init.call(this);
  };

  Timechart_Bar_DisplayUnitLabel.prototype.paintScene = function() {
    return this.updateOption(null, 1);
  };

  Timechart_Bar_DisplayUnitLabel.prototype.updateOption = function(ev, fts) {
    var chart, du;
    chart = this.chart();
    if ((ev && ev.changes && ev.changes.time) || fts) {
      du = chart.scene.displayUnit;
      if (du === null || du === this.displayUnitValue) {
        return;
      }
      this.displayUnitValue = du;
      if (du) {
        return this.ui.em.innerHTML = du.toString();
      }
    }
  };

  return Timechart_Bar_DisplayUnitLabel;

})(Base_Bar_Label);

/*
//@ sourceMappingURL=DisplayUnitLabel.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_BackButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_BackButton = (function(_super) {
  __extends(Timechart_Bar_BackButton, _super);

  function Timechart_Bar_BackButton(options) {
    var _this = this;
    this.options = {
      label: "Back",
      type: "back",
      title: "Move one step back in time scale selection history",
      onClick: function() {
        return _this.chart().back(true, "user");
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_BackButton.__super__.constructor.call(this, this.options);
  }

  return Timechart_Bar_BackButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=BackButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_ZoomOutButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_ZoomOutButton = (function(_super) {
  __extends(Timechart_Bar_ZoomOutButton, _super);

  function Timechart_Bar_ZoomOutButton(options) {
    var _this = this;
    this.options = {
      label: "Zoom-out",
      type: "zoomout",
      title: "Zoom-out to wider time period",
      onClick: function() {
        return _this.chart().zoomOut(null, true, "user");
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_ZoomOutButton.__super__.constructor.call(this, this.options);
  }

  return Timechart_Bar_ZoomOutButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=ZoomOutButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_LinButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_LinButton = (function(_super) {
  __extends(Timechart_Bar_LinButton, _super);

  function Timechart_Bar_LinButton(options) {
    var _this = this;
    this.options = {
      type: "lin",
      label: "Lin",
      title: "Use Linear Scale",
      onClick: function() {
        return _this.chart().updateSettings({
          valueAxis: {
            "default": {
              logScale: false
            },
            secondary: {
              logScale: false
            }
          }
        }, "user");
      },
      onSceneChange: function(ev) {
        var prop;
        if ((prop = Base_Helpers.getProp(ev, "changes/settingsChanges/valueAxis/default/logScale")) !== void 0) {
          return _this.toggleState(prop);
        }
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_LinButton.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_LinButton.prototype.init = function() {
    Timechart_Bar_LinButton.__super__.init.call(this);
    if (!this.chart().settings.valueAxis["default"].logScale) {
      return this.toggleState(false);
    }
  };

  return Timechart_Bar_LinButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=LinButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_LogButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_LogButton = (function(_super) {
  __extends(Timechart_Bar_LogButton, _super);

  function Timechart_Bar_LogButton(options) {
    var _this = this;
    this.options = {
      type: "log",
      label: "Log",
      title: "Use Logaritmic Scale",
      onClick: function() {
        return _this.chart().updateSettings({
          valueAxis: {
            "default": {
              logScale: true
            },
            secondary: {
              logScale: true
            }
          }
        }, "user");
      },
      onSceneChange: function(ev) {
        var p;
        if ((p = Base_Helpers.getProp(ev, "changes/settingsChanges/valueAxis/default/logScale")) !== void 0) {
          if (p) {
            return _this.toggleState(false);
          } else {
            return _this.toggleState(true);
          }
        }
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_LogButton.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_LogButton.prototype.init = function() {
    Timechart_Bar_LogButton.__super__.init.call(this);
    if (this.chart().settings.valueAxis["default"].logScale) {
      return this.toggleState(false);
    }
  };

  return Timechart_Bar_LogButton;

})(Base_Bar_Button);

/*
//@ sourceMappingURL=LogButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_PeriodDayButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_PeriodDayButton = (function(_super) {
  __extends(Timechart_Bar_PeriodDayButton, _super);

  function Timechart_Bar_PeriodDayButton(options) {
    var _this = this;
    this.options = {
      type: "day",
      title: "View data for the last day",
      period: "1 d",
      onClick: function(obj) {
        return _this.setOption();
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_PeriodDayButton.__super__.constructor.call(this, this.options);
  }

  return Timechart_Bar_PeriodDayButton;

})(Timechart_Bar_PeriodButton);

/*
//@ sourceMappingURL=PeriodDayButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_PeriodWeekButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_PeriodWeekButton = (function(_super) {
  __extends(Timechart_Bar_PeriodWeekButton, _super);

  function Timechart_Bar_PeriodWeekButton(options) {
    var _this = this;
    this.options = {
      type: "week",
      title: "View data for the last week",
      period: "1 w",
      onClick: function(obj) {
        return _this.setOption();
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_PeriodWeekButton.__super__.constructor.call(this, this.options);
  }

  return Timechart_Bar_PeriodWeekButton;

})(Timechart_Bar_PeriodButton);

/*
//@ sourceMappingURL=PeriodWeekButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_PeriodMonthButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_PeriodMonthButton = (function(_super) {
  __extends(Timechart_Bar_PeriodMonthButton, _super);

  function Timechart_Bar_PeriodMonthButton(options) {
    var _this = this;
    this.options = {
      type: "month",
      title: "View data for the last month",
      period: "1 M",
      onClick: function(obj) {
        return _this.setOption();
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_PeriodMonthButton.__super__.constructor.call(this, this.options);
  }

  return Timechart_Bar_PeriodMonthButton;

})(Timechart_Bar_PeriodButton);

/*
//@ sourceMappingURL=PeriodMonthButton.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_PeriodDropdown,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_PeriodDropdown = (function(_super) {
  __extends(Timechart_Bar_PeriodDropdown, _super);

  function Timechart_Bar_PeriodDropdown(options) {
    var _this = this;
    this.options = {
      css: "none",
      title: "Select period for which to show the data",
      setInitialValue: false,
      getOptionName: (function(o) {
        return o.name;
      }),
      getOptionIdentifier: (function(o) {
        return o.displayAnchor + o.displayPeriod;
      }),
      onChange: function(obj) {
        var k, p;
        k = obj.selected;
        if (k > 0) {
          p = obj.options.data[k];
          return _this.chart().setDisplayPeriod(p.displayPeriod, p.displayAnchor, p.displayUnit, true);
        }
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_PeriodDropdown.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_PeriodDropdown.prototype.init = function() {
    var chart, periods,
      _this = this;
    chart = this.chart();
    periods = [
      {
        name: chart.settings.localization.custom
      }
    ].concat(chart.settings.toolbars.advanced.periodsParsed);
    this.options.data = periods;
    this.chart().on("timeChange", function(e) {
      return _this.updateOption(e, 1);
    });
    return Timechart_Bar_PeriodDropdown.__super__.init.call(this);
  };

  Timechart_Bar_PeriodDropdown.prototype.updateOption = function(ev, fts) {
    var chart, found, k, n, p, v, _i, _len, _ref;
    chart = this.chart();
    if (ev.changes && ev.changes.time || fts) {
      p = this.options.data[this.selected];
      if ((p != null) && chart.isThisDisplayPeriod(p.displayPeriod, p.displayAnchor)) {
        return;
      }
      found = false;
      _ref = this.options.data;
      for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
        v = _ref[k];
        if (chart.isThisDisplayPeriod(v.displayPeriod, v.displayAnchor)) {
          n = k;
          found = true;
          break;
        }
      }
      if (!found) {
        n = 0;
      }
      return this.setOption(n, 1);
    }
  };

  return Timechart_Bar_PeriodDropdown;

})(Base_Bar_Dropdown);

/*
//@ sourceMappingURL=PeriodDropdown.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Bar_DisplayUnitDropdown,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Bar_DisplayUnitDropdown = (function(_super) {
  __extends(Timechart_Bar_DisplayUnitDropdown, _super);

  function Timechart_Bar_DisplayUnitDropdown(options) {
    var _this = this;
    this.options = {
      css: "bars",
      title: "Select units in which to show the data",
      setInitialValue: false,
      getOptionName: (function(o) {
        return o.name;
      }),
      getOptionIdentifier: (function(o) {
        return o.toString();
      }),
      onChange: function(obj) {
        var k, p;
        k = obj.selected;
        p = obj.options.data[k];
        return _this.chart().setDisplayUnit(p.toString(), true, _this.chart().scene.settings.toolbars.advanced.displayUnit.dynamic);
      },
      onSceneChange: function(ev) {
        return _this.updateOption(ev);
      }
    };
    Base_Helpers.extend(this.options, options);
    Timechart_Bar_DisplayUnitDropdown.__super__.constructor.call(this, this.options);
  }

  Timechart_Bar_DisplayUnitDropdown.prototype.init = function() {
    this.options.data = this.chart().scene.settings.area.displayUnitsParsed;
    return Timechart_Bar_DisplayUnitDropdown.__super__.init.call(this);
  };

  Timechart_Bar_DisplayUnitDropdown.prototype.paintScene = function() {
    return this.updateOption(null, 1);
  };

  Timechart_Bar_DisplayUnitDropdown.prototype.updateOption = function(ev, fps) {
    var bu, chart;
    chart = this.chart();
    if ((ev && ev.changes.time) || fps) {
      bu = chart.scene.displayUnit;
      if (bu === null || bu === this.displayUnitValue) {
        return;
      }
      this.displayUnitValue = bu;
      return this.setOption(bu, true);
    }
  };

  return Timechart_Bar_DisplayUnitDropdown;

})(Base_Bar_Dropdown);

/*
//@ sourceMappingURL=DisplayUnitDropdown.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Infobar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Infobar = (function(_super) {
  __extends(Timechart_Infobar, _super);

  function Timechart_Infobar(options, chart) {
    this.chart = chart;
    Timechart_Infobar.__super__.constructor.call(this, options, this.chart);
    if (this.chart.scene.settings.toolbars.logScale) {
      this.scale = this.addItem(new Timechart_Bar_LinLogLabel(), {
        spot: "right"
      });
    }
    if (this.chart.scene.settings.toolbars.periodSelection) {
      this.period = this.addItem(new Timechart_Bar_PeriodLabel(), {
        spot: "right"
      });
    }
    if (this.chart.scene.settings.toolbars.displayUnit) {
      this.period = this.addItem(new Timechart_Bar_DisplayUnitLabel(), {
        spot: "right"
      });
    }
  }

  return Timechart_Infobar;

})(Base_Infobar);

/*
//@ sourceMappingURL=Infobar.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Toolbar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Toolbar = (function(_super) {
  __extends(Timechart_Toolbar, _super);

  Timechart_Toolbar.prototype.displayUnit = null;

  Timechart_Toolbar.prototype.displayUnitValue = null;

  function Timechart_Toolbar(options, chart) {
    var b, s;
    this.chart = chart;
    Timechart_Toolbar.__super__.constructor.call(this, options, this.chart);
    s = this.addItem(new Base_Bar_ButtonSet({
      buttonMode: "none"
    }), {
      spot: "left"
    });
    if (this.chart.scene.settings.toolbars.backButton) {
      s.addItem(new Timechart_Bar_BackButton());
    }
    if (this.chart.scene.settings.toolbars.zoomOutButton) {
      s.addItem(new Timechart_Bar_ZoomOutButton());
    }
    if (this.chart.scene.settings.toolbars.logScale) {
      s = this.addItem(new Base_Bar_ButtonSet(), {
        spot: "right"
      });
      b = s.addItem(new Timechart_Bar_LinButton());
      b = s.addItem(new Timechart_Bar_LogButton());
    }
    if (this.chart.scene.settings.toolbars.periodSelection) {
      s = this.addItem(new Base_Bar_ButtonSet({
        buttonMode: "one"
      }), {
        spot: "right"
      });
      s.addItem(new Timechart_Bar_PeriodDayButton());
      s.addItem(new Timechart_Bar_PeriodWeekButton());
      s.addItem(new Timechart_Bar_PeriodMonthButton());
      s.addItem(new Timechart_Bar_PeriodDropdown());
    }
    if (this.chart.scene.settings.toolbars.displayUnit) {
      this.addItem(new Timechart_Bar_DisplayUnitDropdown(), {
        spot: "right"
      });
    }
  }

  return Timechart_Toolbar;

})(Base_Toolbar);

/*
//@ sourceMappingURL=Toolbar.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_ToolbarAdv,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_ToolbarAdv = (function(_super) {
  __extends(Timechart_ToolbarAdv, _super);

  Timechart_ToolbarAdv.prototype.displayUnit = null;

  Timechart_ToolbarAdv.prototype.displayUnitValue = null;

  Timechart_ToolbarAdv.prototype.panScene = false;

  Timechart_ToolbarAdv.prototype.relativeClass = "infobar";

  function Timechart_ToolbarAdv(options, chart) {
    var b, s;
    this.chart = chart;
    Timechart_ToolbarAdv.__super__.constructor.call(this, options, this.chart);
    s = this.addItem(new Base_Bar_ButtonSet({
      buttonMode: "none"
    }), {
      spot: "left"
    });
    if (this.chart.scene.settings.toolbars.backButton) {
      s.addItem(new Timechart_Bar_BackButton());
    }
    if (this.chart.scene.settings.toolbars.zoomOutButton) {
      s.addItem(new Timechart_Bar_ZoomOutButton());
    }
    if (this.chart.scene.settings.toolbars.logScale) {
      s = this.addItem(new Base_Bar_ButtonSet(), {
        spot: "right"
      });
      b = s.addItem(new Timechart_Bar_LinButton());
      b = s.addItem(new Timechart_Bar_LogButton());
    }
    if (this.chart.scene.settings.toolbars.periodSelection) {
      s = this.addItem(new Base_Bar_ButtonSet({
        buttonMode: "one"
      }), {
        spot: "right"
      });
      s.addItem(new Timechart_Bar_PeriodDayButton());
      s.addItem(new Timechart_Bar_PeriodWeekButton());
      s.addItem(new Timechart_Bar_PeriodMonthButton());
      s.addItem(new Timechart_Bar_PeriodDropdown());
    }
    if (this.chart.scene.settings.toolbars.displayUnit) {
      this.addItem(new Timechart_Bar_DisplayUnitDropdown(), {
        spot: "right"
      });
    }
  }

  return Timechart_ToolbarAdv;

})(Base_Toolbar);

/*
//@ sourceMappingURL=ToolbarAdv.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_ToolbarBare,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_ToolbarBare = (function(_super) {
  __extends(Timechart_ToolbarBare, _super);

  Timechart_ToolbarBare.prototype.displayUnit = null;

  Timechart_ToolbarBare.prototype.displayUnitValue = null;

  Timechart_ToolbarBare.prototype.panScene = false;

  Timechart_ToolbarBare.prototype.relativeClass = "infobar";

  function Timechart_ToolbarBare(options, chart) {
    var s;
    this.chart = chart;
    Timechart_ToolbarBare.__super__.constructor.call(this, options, this.chart);
    s = this.addItem(new Base_Bar_ButtonSet({
      buttonMode: "none"
    }), {
      spot: "left"
    });
    if (this.chart.scene.settings.toolbars.backButton) {
      s.addItem(new Timechart_Bar_BackButton({
        label: null
      }));
    }
    if (this.chart.scene.settings.toolbars.zoomOutButton) {
      s.addItem(new Timechart_Bar_ZoomOutButton({
        label: null
      }));
    }
    if (this.chart.scene.settings.toolbars.logScale) {
      this.addItem(new Timechart_Bar_LinLogButton({
        label: null
      }), {
        spot: "right"
      });
    }
    if (this.chart.scene.settings.toolbars.periodSelection) {
      s = this.addItem(new Base_Bar_ButtonSet({
        buttonMode: "one"
      }), {
        spot: "right"
      });
      s.addItem(new Timechart_Bar_PeriodDayButton());
      s.addItem(new Timechart_Bar_PeriodWeekButton());
      s.addItem(new Timechart_Bar_PeriodMonthButton());
      s.addItem(new Timechart_Bar_PeriodDropdown({
        showTitle: null,
        label: null,
        hasIcon: null
      }));
    }
    if (this.chart.scene.settings.toolbars.displayUnit) {
      this.addItem(new Timechart_Bar_DisplayUnitDropdown({
        showTitle: null
      }), {
        spot: "right"
      });
    }
    if (this.chart.scene.settings.toolbars["export"]) {
      this.addItem(new Timechart_Bar_ExportDropdown({
        showTitle: null
      }), {
        spot: "right"
      });
    }
  }

  return Timechart_ToolbarBare;

})(Base_Toolbar);

/*
//@ sourceMappingURL=ToolbarBare.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_MultiBar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_MultiBar = (function(_super) {
  __extends(Timechart_MultiBar, _super);

  Timechart_MultiBar.prototype.createCoreContainer = false;

  function Timechart_MultiBar(container, chart) {
    var def, enabled, k, v, _i, _len;
    this.chart = chart;
    Timechart_MultiBar.__super__.constructor.call(this, container, this.chart);
    this.ui.container = container;
    enabled = Base_Helpers.realClone(this.chart.settings.toolbars.enabled);
    def = this.chart.settings.toolbars["default"];
    if ((def != null) && (!Base_Helpers.arrayContains(enabled, def))) {
      enabled.push(def);
    }
    for (k = _i = 0, _len = enabled.length; _i < _len; k = ++_i) {
      v = enabled[k];
      if (v === "infobar") {
        this.addItem(new Timechart_Infobar({
          container: container
        }, this.chart));
      } else if (v === "toolbar") {
        this.addItem(new Timechart_Toolbar({
          container: container
        }, this.chart));
      } else if (v === "toolbarAdv") {
        this.addItem(new Timechart_ToolbarAdv({
          container: container,
          align: "valueAxis"
        }, this.chart));
      } else if (v === "toolbarBare") {
        this.addItem(new Timechart_ToolbarBare({
          container: container,
          align: "valueAxis"
        }, this.chart));
      } else {
        this.chart.error("Unrecognized toolbar: " + v);
      }
      if (def === v) {
        this.cycleNext(null, this.items.length - 1);
      }
    }
  }

  Timechart_MultiBar.prototype.cycleNext = function(caller, force) {
    if (force != null) {
      this.items[force].obj.show(1);
      this.currentBar = force;
      return;
    }
    if (typeof this.currentBar === "undefined") {
      this.items[0].obj.show(1);
      this.currentBar = 0;
      return;
    }
    this.items[this.currentBar].obj.hide(1);
    this.currentBar++;
    if (this.items.length <= this.currentBar) {
      this.currentBar = 0;
    }
    return this.items[this.currentBar].obj.show(1);
  };

  return Timechart_MultiBar;

})(Base_View);

/*
//@ sourceMappingURL=MultiBar.map
*/

// Generated by CoffeeScript 1.6.3
var Timechart_Impl,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Timechart_Impl = (function(_super) {
  __extends(Timechart_Impl, _super);

  "use strict";

  Timechart_Impl.prototype.scrolling = null;

  Timechart_Impl.prototype.renderer = null;

  Timechart_Impl.prototype.timeStart = 0;

  Timechart_Impl.prototype.timeEnd = 0;

  Timechart_Impl.prototype.displayUnit = null;

  Timechart_Impl.prototype.selectionStart = 0;

  Timechart_Impl.prototype.selectionEnd = 0;

  Timechart_Impl.prototype.goingBack = false;

  Timechart_Impl.prototype.EVENT_NAMES = {
    "timeChange": "onTimeChange",
    "selectionChange": "onSelectionChange",
    "click": "onClick",
    "doubleClick": "onDoubleClick",
    "error": "onError",
    "animationDone": "onAnimationDone",
    "settingsChange": "onSettingsChange"
  };

  function Timechart_Impl(settings, api) {
    this.updateSizeImpl = __bind(this.updateSizeImpl, this);
    var click;
    this.settings = new Timechart_Settings(settings);
    this.scene = new Timechart_Scene(this.settings);
    this.scene.data = new Timechart_Data(this, this.settings.data);
    this.layers = new Timechart_Layers(this);
    Timechart_Impl.__super__.constructor.call(this, api);
    this.setupMarkers();
    this.updateSize();
    this.renderer = new Timechart_Renderer(this);
    click = new Timechart_ClickNotifier(this);
    this.scrolling = new Timechart_Scrolling(this);
    this.events.addElement(this.scrolling);
    this.events.addElement(this.renderer);
    this.events.addElement(click);
    this.events.addElement(new Timechart_Markers(this));
    this.events.addElement(new Timechart_Highlights(this));
    this.events.addElement(new Timechart_Selection(this));
    this.events.addElement(new Base_Resizer(this));
    this.events.addElement(new Timechart_InfoPopup(this));
    this.events.addElement(new Timechart_TimeUpdater(this));
    this.events.addElement(new Base_MessagesOverlay(this));
    this.multibar = new Timechart_MultiBar(this.layers.container, this);
    this.setupInitialDisplayPeriod();
    this.notifyTimeChanged(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, "init");
    this.events.notifySceneChanges({
      bounds: true,
      settings: true,
      settingsChanges: this.settings
    });
    this.updateEvents({}, this.settings.events, this.EVENT_NAMES);
  }

  Timechart_Impl.prototype.initializeImpl = function() {
    return this.multibar.render();
  };

  Timechart_Impl.prototype.removeImpl = function() {
    this.layers = null;
    this.renderer = null;
    this.scene.data = null;
    return this.scene = null;
  };

  Timechart_Impl.prototype.setupInitialDisplayPeriod = function() {
    var _this = this;
    if (this.scene.displayUnit && (this.scene.timeStart || this.scene.timeEnd)) {
      return;
    }
    this.scene.anchor = this.settings.area.initialDisplayAnchor;
    this.scene.period = this.settings.area.initialDisplayPeriod;
    this.scene.setMessage("impl", this.settings.localization.loadingLabel, 10);
    return this.computeDisplayPeriod(this.settings.area.initialDisplayPeriod, this.settings.area.initialDisplayAnchor, this.settings.area.initialDisplayUnit, function(form, to, unit) {
      _this.scene.setMessage("impl", null);
      if (_this.scene.displayUnit != null) {
        unit = _this.scene.displayUnit;
      }
      if (!_this.scene.timeStart && !_this.scene.timeEnd) {
        return _this.scrolling.setTimeRange(form, to, unit, false, "init");
      }
    });
  };

  Timechart_Impl.prototype.updateSettings = function(newSettings, origin) {
    var changes, newUnit, old, s;
    if (origin == null) {
      origin = null;
    }
    old = Base_Helpers.clone(this.settings.events);
    changes = this.settings.apply(newSettings);
    this.layers.updateSettings(changes);
    this.updateEvents(old, this.settings.events, this.EVENT_NAMES);
    if (changes.data != null) {
      this.scene.data.remove();
      this.scene.data = new Timechart_Data(this, this.settings.data);
      this.setupInitialDisplayPeriod();
    } else if (Base_Helpers.getProp(changes, "area/displayUnits")) {
      s = new Timechart_TimeSetup(this.settings);
      if (!s.isAllowedDisplayUnit(this.scene.displayUnit)) {
        newUnit = s.computeDisplayUnit(this.scene.timeStart, this.scene.timeEnd, this.scene.displayUnit, this.scene.timeStart, this.scene.timeEnd, this.scene);
        this.scrolling.setTimeRangeSnap(this.scene.timeStart, this.scene.timeEnd, null, newUnit, true, true, true, "api");
      }
    }
    this.events.notifySceneChanges({
      settings: true,
      time: true,
      settingsChanges: changes
    });
    if (origin) {
      return this.notifySettingsChanged(changes, origin);
    }
  };

  Timechart_Impl.prototype.updateSizeImpl = function(clientWidth, clientHeight) {
    var axis, bottomMargin, height, leftAxis, leftMargin, rightAxis, rightMargin, topMargin, width, _i, _len, _ref;
    this.scene.chartHeight = clientHeight;
    this.scene.chartWidth = clientWidth;
    leftAxis = 0;
    rightAxis = 0;
    leftMargin = 0;
    rightMargin = 0;
    bottomMargin = 0;
    topMargin = 0;
    _ref = this.settings.getValueAxisList();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      axis = _ref[_i];
      if (!axis.enabled) {
        continue;
      }
      if (axis.side === "left") {
        leftAxis += axis.size;
        if (axis.position !== "inside") {
          leftMargin += axis.size;
        }
      } else {
        rightAxis += axis.size;
        if (axis.position !== "inside") {
          rightMargin += axis.size;
        }
      }
    }
    this.scene.leftValueAxisSize = leftAxis;
    this.scene.rightValueAxisSize = rightAxis;
    if (this.scene.toolbarHeight) {
      topMargin += this.scene.toolbarHeight;
    }
    if (this.settings.timeAxis.enabled) {
      this.scene.timeAxisSize = this.settings.timeAxis.size;
      bottomMargin += this.scene.timeAxisSize;
    } else {
      this.scene.timeAxisSize = 0;
    }
    height = Math.max(clientHeight, topMargin + bottomMargin + 1);
    width = Math.max(clientWidth, leftMargin, rightMargin + 1);
    this.scene.x0 = leftMargin;
    this.scene.y0 = topMargin;
    this.scene.width = width - leftMargin - rightMargin;
    this.scene.height = height - topMargin - bottomMargin;
    this.scene.canvasWidth = width;
    this.scene.canvasHeight = height;
    this.layers.updateSize();
    if (this.events != null) {
      return this.events.notifySceneChanges({
        bounds: true
      });
    }
  };

  Timechart_Impl.prototype.addData = function(data, sourceId) {
    this.scene.data.addData(null, data, true);
    return this.events.notifySceneChanges({
      data: true
    });
  };

  Timechart_Impl.prototype.setupMarkers = function() {
    var m;
    this.scene.markers = [];
    if (this.scene.settings.area.currentTimeMarker != null) {
      m = new Timechart_Marker();
      m.time = new Date().getTime() + this.scene.settings.data.timeOffset;
      m.style = this.scene.settings.area.style.currentTimeMarker;
      m.label = this.scene.settings.area.currentTimeMarker;
      return this.scene.markers.push(m);
    }
  };

  Timechart_Impl.prototype.reloadData = function() {
    this.scene.data = new Timechart_Data(this, this.settings.data);
    return this.events.notifySceneChanges({
      data: true
    });
  };

  Timechart_Impl.prototype.save = function() {
    return JSON.stringify({
      from: this.timeStart,
      to: this.timeEnd,
      unit: this.displayUnit.toString(),
      selFrom: this.scene.selectionStart,
      selTo: this.scene.selectionEnd
    });
  };

  Timechart_Impl.prototype.restore = function(stateStr, animate) {
    var state, unit;
    if (!stateStr) {
      return;
    }
    state = JSON.parse(stateStr);
    unit = Base_TimeStep.parse(state.unit);
    if (!unit) {
      this.error("Restore state: illegal display  unit: " + state.unit);
      return;
    }
    this.scrolling.setTimeRange(state.from, state.to, unit, animate, "api");
    return this.setSelection(state.selFrom, state.selTo);
  };

  Timechart_Impl.prototype.back = function(animate, origin) {
    var b, f, t, _ref;
    if (animate == null) {
      animate = true;
    }
    if (origin == null) {
      origin = "api";
    }
    if (this.scene.backStack.length === 0) {
      return false;
    }
    _ref = this.scene.popBack(), f = _ref[0], t = _ref[1], b = _ref[2];
    this.goingBack = true;
    this.scrolling.setTimeRange(f, t, b, animate, origin);
    return this.goingBack = false;
  };

  Timechart_Impl.prototype.setSelection = function(from, to) {
    if (this.scene.selectionStart === from && this.scene.selectionEnd === to) {
      return;
    }
    this.scene.selectionStart = from;
    this.scene.selectionEnd = to;
    this.events.notifySceneChanges({
      selection: true
    });
    return this.notifySelectionChanged("api");
  };

  Timechart_Impl.prototype.setTimeRange = function(f, t, u, a) {
    this.scene.period = null;
    this.setSelection(null, null);
    return this.scrolling.setTimeRange(f, t, u, a, "api");
  };

  Timechart_Impl.prototype.setDisplayPeriod = function(displayPeriod, displayAnchor, displayUnit, animate) {
    var _this = this;
    if (displayAnchor == null) {
      displayAnchor = null;
    }
    if (displayUnit == null) {
      displayUnit = null;
    }
    if (animate == null) {
      animate = true;
    }
    if (displayAnchor == null) {
      displayAnchor = this.scene.anchor;
    }
    this.setSelection(null, null);
    if (typeof displayAnchor === "string") {
      displayAnchor = displayAnchor.trim();
    }
    if (typeof displayPeriod === "string") {
      displayPeriod = displayPeriod.trim();
    }
    this.scene.anchor = displayAnchor;
    this.scene.period = displayPeriod;
    return this.computeDisplayPeriod(displayPeriod, displayAnchor, displayUnit, function(form, to, unit) {
      return _this.scrolling.setTimeRange(form, to, unit, animate, "api");
    });
  };

  Timechart_Impl.prototype.scrollIntoView = function(time) {
    return this.error("ScrollIntoView: not implemented");
  };

  Timechart_Impl.prototype.scroll = function(amount, animate) {
    var count, direction, from, s, to, unit, units, _ref;
    units = amount.trim().split(" ");
    if (units.length !== 3) {
      this.error("Incorrect scroll format: " + amount);
      return;
    }
    direction = units[0];
    count = parseInt(units[1]);
    unit = units[2];
    if ((direction !== "<" && direction !== ">") || typeof count !== "number") {
      this.error("Scroll:Incorrect scroll format: " + amount);
      return;
    }
    s = new Timechart_TimeSetup(this.settings);
    _ref = s.scroll(this.timeStart, this.timeEnd, this.displayUnit, direction, count, unit), from = _ref[0], to = _ref[1];
    return this.scrolling.setTimeRange(from, to, this.displayUnit, animate, "api");
  };

  Timechart_Impl.prototype.zoomOut = function(unit, animate, origin) {
    if (animate == null) {
      animate = true;
    }
    if (origin == null) {
      origin = "api";
    }
    this.setSelection(null, null);
    this.scrolling.zoomOut(unit, this.scene.timeStart, this.scene.timeEnd, null, animate, origin);
    return this.scene.period = null;
  };

  Timechart_Impl.prototype.setDisplayUnit = function(unitStr, animate, rescale, scaleCenter) {
    var approxUnits, dataFrom, dataTo, from, maxUnits, s, to, unit, _ref, _ref1, _ref2;
    unit = Base_TimeStep.parse(unitStr);
    if (unit == null) {
      return;
    }
    if (!rescale) {
      maxUnits = this.settings.advanced.maxUnitsToDisplay;
      approxUnits = (this.timeEnd - this.timeStart) / unit.approxTime();
      while (approxUnits > maxUnits) {
        unit = unit.getBigger();
        approxUnits = (this.timeEnd - this.timeStart) / unit.approxTime();
      }
      return this.scrolling.setTimeRange(this.timeStart, this.timeEnd, unit, false, "api");
    } else {
      this.scene.period = null;
      if (scaleCenter == null) {
        scaleCenter = (this.timeStart + this.timeEnd) / 2;
      }
      s = new Timechart_TimeSetup(this.settings);
      _ref = this.scene.getDataPeriod(), dataFrom = _ref[0], dataTo = _ref[1];
      _ref1 = s.preventOverscale(this.scene, [unit], scaleCenter, -Infinity, Infinity, dataFrom, dataTo), from = _ref1[0], to = _ref1[1];
      _ref2 = this.scrolling.computeTimeRangeExtend(from, to, unit), from = _ref2[0], to = _ref2[1];
      return this.scrolling.setTimeRange(from, to, unit, animate, "api");
    }
  };

  /* events*/


  Timechart_Impl.prototype.notifyTimeChanged = function(from, to, displayUnit, origin) {
    if (this.timeStart === from && this.timeEnd === to && (this.displayUnit != null) && this.displayUnit.toString() === displayUnit.toString()) {
      return;
    }
    if ((this.displayUnit != null) && !this.goingBack) {
      this.scene.pushBack(this.timeStart, this.timeEnd, this.displayUnit);
    }
    this.timeStart = from;
    this.timeEnd = to;
    this.displayUnit = displayUnit;
    return this.dispatchEvent("timeChange", this.extendEventParams({
      origin: origin
    }), null, this.settings.events.timeChangeEventDelay);
  };

  Timechart_Impl.prototype.cancelTimeChangeNotify = function() {
    return this.cancelDelayedEvent("timeChange");
  };

  Timechart_Impl.prototype.notifyAnimationDone = function() {
    return this.dispatchEventParams("animationDone", this.extendEventParams({}), null);
  };

  Timechart_Impl.prototype.notifySelectionChanged = function(origin) {
    return this.dispatchEventParams("selectionChange", this.extendEventParams({
      origin: origin
    }), null);
  };

  Timechart_Impl.prototype.notifyDoubleClick = function(e) {
    return this.dispatchEvent("doubleClick", this.extendEventParams(e), null);
  };

  Timechart_Impl.prototype.notifyClick = function(e) {
    return this.dispatchEvent("click", this.extendEventParams(e), this.defaultClick);
  };

  Timechart_Impl.prototype.extendEventParams = function(p) {
    p.timeStart = this.timeStart;
    p.timeEnd = this.timeEnd;
    p.displayUnit = this.displayUnit != null ? this.displayUnit.toString() : null;
    p.selectionStart = this.scene.selectionStart;
    p.selectionEnd = this.scene.selectionEnd;
    return p;
  };

  /* Initial time range*/


  Timechart_Impl.prototype.computeDisplayPeriod = function(periodStr, anchorStr, displayUnitStr, callback) {
    var dataLoaded, from, to, unit, _ref,
      _this = this;
    _ref = this.scrolling.computeDisplayPeriod(periodStr, anchorStr, displayUnitStr, this.scene.data.dataLimitFrom, this.scene.data.dataLimitTo), from = _ref[0], to = _ref[1], unit = _ref[2];
    if ((from != null) && (to != null) && unit) {
      if ((from != null) && (to != null)) {
        return callback(from, to, unit);
      }
    }
    if ((this.settings.data.dataFunction == null) && (this.settings.data.url == null) && (this.settings.data.urlByUnit == null) && (this.settings.data.preloaded == null)) {
      this.error("Cannot compute data dependant display period, no data given. DisplayPeriod = " + periodStr + ", DisplayAnchor = " + anchorStr);
      return;
    }
    dataLoaded = function(dataFrom, dataTo, dataUnit, oldFrom, oldTo, oldUnit) {
      var displayUnit, _ref1;
      if (_this.removed) {
        return;
      }
      if (dataFrom === null || dataTo === null || (dataFrom === 0 && dataTo === 0 && _this.scene.data.noData)) {
        callback(oldFrom, oldTo, oldUnit);
        return;
      }
      _ref1 = _this.scrolling.computeDisplayPeriod(periodStr, anchorStr, displayUnitStr, dataFrom, dataTo), from = _ref1[0], to = _ref1[1], displayUnit = _ref1[2];
      if (!((from != null) && (to != null))) {
        _this.error("Could not setup display time interval. Check your configuration.");
        return;
      }
      if (Timechart_TimeSetup.isSmallerOrEqualUnit(dataUnit, displayUnit.unit)) {
        return callback(from, to, displayUnit);
      } else {
        return _this.scene.data.determineDataLimits(displayUnit.unit, true, true, function(a, b, c) {
          return dataLoaded(a, b, c, dataFrom, dataTo, displayUnit);
        });
      }
    };
    return this.scene.data.determineDataLimits(null, true, true, function(a, b, c) {
      return dataLoaded(a, b, c, 0, 0, null);
    });
  };

  /*
    Tests if the display period is currently displayed.
  */


  Timechart_Impl.prototype.isThisDisplayPeriod = function(periodStr, anchorStr) {
    var from, to, unit, _ref;
    if (!this.displayUnit) {
      return false;
    }
    from = this.scene.data.dataLimitFrom;
    to = this.scene.data.dataLimitTo;
    _ref = this.scrolling.computeDisplayPeriod(periodStr, anchorStr, this.displayUnit, from, to), from = _ref[0], to = _ref[1], unit = _ref[2];
    return from === this.timeStart && to === this.timeEnd;
  };

  Timechart_Impl.prototype.defaultClick = function(event) {
    return this.time(event.clickStart, event.clickEnd);
  };

  return Timechart_Impl;

})(Base_Impl);

/*
//@ sourceMappingURL=Impl.map
*/

// Generated by CoffeeScript 1.6.3
/*
  Creates time chart ghaphichal widget.
*/

var TimeChart,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

TimeChart = (function() {
  "use strict";
  TimeChart.themes = {
    "flat": Timechart_Settings.FlatTheme,
    "round": Timechart_Settings.RoundTheme,
    "gradient": Timechart_Settings.GradientTheme,
    "static": Timechart_Settings.StaticChart
  };

  TimeChart.prototype._impl = null;

  TimeChart.prototype._scene = null;

  TimeChart.prototype.settings = null;

  function TimeChart(settings) {
    this._initialize = __bind(this._initialize, this);
    /*
    Executed when **new TimeChart(settings)** is called. Will create new chart, filling the whole container, load data and display.
    */

    this._impl = new Timechart_Impl(settings, this);
    this.settings = this._impl.settings;
    this._scene = this._impl.scene;
    setTimeout(this._initialize, 0);
    return this;
  }

  TimeChart.prototype._initialize = function() {
    return this._impl.initialize();
  };

  TimeChart.prototype.saveState = function() {
    return this._impl.save();
  };

  TimeChart.prototype.restoreState = function(state, animate) {
    if (animate == null) {
      animate = false;
    }
    return this._impl.restore(state, animate);
  };

  TimeChart.prototype.updateSettings = function(changes) {
    /*
      Change settings, can pass the same settings as in constructor.
      Only pass the settings you need changed.
    */

    this._impl.updateSettings(changes, "api");
    return this;
  };

  TimeChart.prototype.customize = function(name) {
    /*
      Applies one of predefined customizations from TimeChart.themes
    */

    if (!TimeChart.themes.hasOwnProperty(name)) {
      throw "Time chart: no customization named " + name;
    }
    return this.updateSettings(TimeChart.themes[name]);
  };

  TimeChart.prototype.on = function(name, listener) {
    /*
     Adds event listener.
     Supported event types: "timeChange", "selectionChange, "click", "doubleClick".
    */

    return this._impl.on(name, listener);
  };

  TimeChart.prototype.off = function(name, listener) {
    return this._impl.off(name, listener);
  };

  TimeChart.prototype.updateSize = function() {
    /*
      Call when the container size has been changed to update the chart.
    */

    this._impl.updateSize();
    return this;
  };

  TimeChart.prototype.time = function(from, to, animate) {
    if (animate == null) {
      animate = true;
    }
    /*
      Set/get displayed time range in javascript timestamp (milliseconds).
      returns [from, to] in list form.
    */

    if (from !== void 0 && to !== void 0) {
      this._impl.setTimeRange(from, to, null, animate);
    }
    return [this._impl.timeStart, this._impl.timeEnd];
  };

  /*
    Set displayed time range using period and anchor.
    See settings for possible period / anchor values.
  */


  TimeChart.prototype.setDisplayPeriod = function(period, anchor, animate) {
    return this._impl.setDisplayPeriod(period, anchor, null, animate);
  };

  TimeChart.prototype.displayUnit = function(unit, animate, rescale, reslaceCenter) {
    if (animate == null) {
      animate = true;
    }
    if (rescale == null) {
      rescale = false;
    }
    if (reslaceCenter == null) {
      reslaceCenter = null;
    }
    /*
      Get/set current bar unit.
      Examples: m, s, h, 2 h, 10 m
    */

    if (unit != null) {
      this._impl.setDisplayUnit(unit, animate, rescale, reslaceCenter);
    }
    if (this._impl.displayUnit != null) {
      return this._impl.displayUnit.toString();
    } else {
      return null;
    }
  };

  TimeChart.prototype.selection = function(from, to) {
    /*
      Set/get selection in javascript timestamp (milliseconds).
      Use null, null to remove selection.
      returns [from, to] in list form.
    */

    if (from !== void 0 && to !== void 0) {
      this._impl.setSelection(from, to);
    }
    return [this._scene.selectionStart, this._scene.selectionEnd];
  };

  TimeChart.prototype.back = function() {
    return this._impl.back();
  };

  TimeChart.prototype.scroll = function(amount, animate) {
    if (animate == null) {
      animate = true;
    }
    /*
       Scrools left or right.
       Amount format is the following: ** </> amount unit **
    
       * < scrolls to the left, > scrolls to the right
       * amount: integer amount of units to scroll
       * unit: one of page,bar,y,M,d,w,h,m,s,ms
    
       Examples:
       * scroll("< 1 s") scrolls left 1 second, no animation
       * scroll("> 10 y", true) scrolls right, 10 years with animation
    */

    return this._impl.scroll(amount, animate);
  };

  TimeChart.prototype.zoomOut = function(unit, animate) {
    if (unit == null) {
      unit = null;
    }
    if (animate == null) {
      animate = true;
    }
    /*
       Zooms out.
    */

    return this._impl.zoomOut(unit, animate, "api");
  };

  TimeChart.prototype.reloadData = function() {
    /*
      Clears data cache and loads new data. The time range is preserved.
    */

    return this._impl.reloadData();
  };

  TimeChart.prototype.addData = function(data, sourceId) {
    /*
      Adds specific data to the cache.
    */

    return this._impl.addData(data, sourceId);
  };

  TimeChart.prototype.remove = function() {
    /*
      Removes chart from DOM. Is automatically called when you create a new Chart with the same container.
    */

    return this._impl.remove();
  };

  TimeChart.prototype.getSize = function() {
    return [this._impl.scene.canvasWidth, this._impl.scene.canvasHeight];
  };

  TimeChart.prototype.exportImage = function(scaling, type, transparent) {
    var img;
    return img = this._impl.events.paintToImage(scaling, type, transparent);
  };

  return TimeChart;

})();

/*
//@ sourceMappingURL=TimeChart.map
*/


    this.TimeChart = TimeChart;

}).call(this);
