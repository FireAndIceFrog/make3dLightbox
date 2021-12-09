#define listLength 4
#define specularHighlight 1.8
#define PI 3.14159265359
#define TAU 6.28318530718

precision mediump float;
const vec2  resolution = vec2(1000,500);
//uniform vec2 positions[listLength];
//uniform vec2 colors[listLength];

vec3 blend(vec3 color, vec3 color2)
{
	vec3 blendColor = abs(color - color2);
	return blendColor;
}

void main(void) {
   	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 destColor = vec3(0.0);

	vec2 positions[listLength];
    positions[0] = vec2(0.5, 0.2);
	positions[1] = vec2(-0.5, 0.2);
	positions[2] = vec2(0.0, -0.7);
	positions[3] = vec2(0, 0);

    vec3 colors[listLength];
	colors[0] = vec3(1.0,0.0,0.0);
	colors[1] = vec3(0.0,1.0,0.0);
	colors[2] = vec3(0.0,0.0,1.0);
	colors[3] = vec3(1,1,1);
	
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
