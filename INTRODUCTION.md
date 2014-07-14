Introduction
============

##The Shader Interface

A shader is a compiled program that is being executed directly on your graphics card. There are different types of shaders, the most common ones being the fragment and vertex shader. Shaders can be written in GLSL or HLSL - high-level languages specifically designed for shader programs. To compile these shader programs in your browser, a JavaScript API called WebGL is used. WebGL is based on OpenGL ES 2.0 (a mobile version of the standard OpenGL specification) and thus uses the OpenGL Shading Language (GLSL).

The vertex shader's task is to process given vertices and map them from 3D space onto your screen in 2D space. The fragment shader uses that information to colour each individual pixel. Since we want to keep things as simple as possible, all the calculation is done in the fragment shader. The pixel coordinates come from a predefined simple square (actually two triangles) which covers the whole viewport in the vertex shader. In the default example, the produced image is a simple, coloured gradient based on the coordinate of each individual pixel.

It turns out that this specific setup allows us to create astonishing 3D scenes using a simple method called raymarching or raytracing, which works as follows: For each pixel, you create an additional z-component, pushing it into the screen. From the center of the viewport (that is, our screen) we then travel in that direction, like a blind man, until we hit something. With the help of a few mathematical functions, referred to as distance functions, we can detect these collisions.

The distance function for a sphere is the simplest one and looks like this:  
`float sdSphere(vec3 position, float radius) { return length(position) - radius; }`  

Whenever this function returns a value lower than zero, we know for sure that we must be inside the sphere and we colour that pixel based on the distance travelled.

##The DSP Interface

For the audio processor interface we take advantage of JavaScript's [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). Don't worry if most of these functions look unfamiliar to you, all you need to know to begin programming music are the fundamentals of soundwaves (and some JavaScript).

The nature of sound, the way humans perceive it, lies in air pressure changes. The smallest vibration of an object on a microscopic scale causes the air pressure around you to increase and decrease in an interval. The pattern of change in air pressure can be represented visually by plotting the change on the y-axis and time on the x-axis, resulting in wave-like graphs.

Let's continue by defining the two basic properties of a sound wave: **amplitude** and **frequency**. The amplitude directly corresponds to the change in air pressure, so simply speaking, the y-axis of a 2D sound wave graph represents the amplitude. To the human ear, the amplitude of a sound wave can roughly be described as "loudness" (think of the word *amplify*).

The frequency of a sound wave corresponds to the amount of cycles it performs each seconds. These cycles, also called periods, are measured in Hertz (Hz). An unmodulated sine wave for example has a period of 2π. We humans relate the frequency of a sound wave to what we call "pitch".

With that basic knowledge, we can now start programming music! In the audio processor interface, all we have to do is define a function `f(t)` returning a value form -1 to 1.

Creating the musical note A<sub>4</sub> is as simple as:  
`function f(t) { return Math.sin(2 * Math.PI  * 440 * t); }`

With `2 * Math.PI` turning the wavelength to 1 and `440` being the note's specific frequency. 