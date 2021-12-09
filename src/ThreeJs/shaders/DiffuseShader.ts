export default `
#define specularHighlight 1.8
#define PI 3.14159265359
#define TAU 6.28318530718

precision mediump float;

uniform vec2 resolution;
uniform vec2 positions[listLength];
uniform vec3 colors[listLength];
vec3 blend(vec3 color, vec3 color2)
{
	vec3 blendColor = abs(color - color2);
	return blendColor;
}

void main(void) {
   	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 destColor = vec3(0.0);
	
	float d = 0.0;

	p.y += 0.2;

  	// Number of sides of your shape
  	int N = 4;

 	 // Angle and radius from the current pixel
  	float a = atan(p.x,p.y)+PI;
  	float truc = TAU/float(N);

  	// Shaping function that modulate the distance
  	d = cos(floor(.5+a/truc)*truc-a)*length(p);

  	vec3 shape = vec3(1.0-smoothstep(.4,.41,d));
	
    for(int i=0; i<listLength; ++i)
    {
        float colorProportion = (1.0 - length(p+positions[i])*specularHighlight);
        vec3 color = colors[i] * vec3(colorProportion);
        destColor += shape * color;
    }

    gl_FragColor = vec4(destColor, 1.0);
}

`