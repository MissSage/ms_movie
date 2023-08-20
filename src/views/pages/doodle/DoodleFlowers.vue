<template>
  <div class="css-doodle-wrapper">
    <div class="page">
      <div class="moon">
        <css-doodle click-to-update use="var(--moon)"></css-doodle>
        <div class="desc bottom100 right orange">
          用css-doodle生成一个带水波的水中月
        </div>
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--shaders)"></css-doodle>
      <div class="desc right bottom100 orange">
        css-doodle渐变色
      </div>
    </div>
    <div class="page">

      <css-doodle click-to-update use="var(--shaders1)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 奇怪的形状
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--hex)"></css-doodle>
      <div class="desc right bottom100 lightgreen">
        css-doodle hex
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--wave)"></css-doodle>
      <div class="desc right bottom100 lightgreen">
        css-doodle wave
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--flowers)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 花
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--triangles)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 很多三角形
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--lastpick)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 随机的样式格子
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--repeat)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 细胞
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--multiple)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 渐变
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--pie)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 饼图
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--svg)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 射线
      </div>
    </div>
    <div class="page">
      <css-doodle click-to-update use="var(--container),var(--doodle)"></css-doodle>
      <div class="desc bottom100 right orange">
        css-doodle 嵌套的三角形
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'css-doodle'
</script>
<style lang="scss" scoped>
// css-doodle的样式代码与代码格式化有冲突，不要在此页面进行代码格式化
.css-doodle-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
  
  css-doodle {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    --container: ( :doodle {
        @grid: 12 / 100vmax;
        background: #0a0c27;
      });

    --shaders1:(@grid: 1 / 8em;

      background: @shaders(texture1 {
          @grid: 1 / 100%;
          background: linear-gradient(45deg,
            @stripe.@m20.@p(#FFF4E0, #F8B501, #06ACB5, #17191D, #FC3D3C));
        }

        fragment {
          void main() {
            vec2 p=gl_FragCoord.xy / u_resolution.xy;
            vec2 c=vec2(.5, .5);
            vec2 uv=p.xy - c;
            float R=3.141593;
            float len=length(uv * vec2(u_resolution.x / u_resolution.y, 1.));
            float angle=atan(uv.y, uv.x) + R * smoothstep(.75, 0., len);
            float r=length(uv) + .1;
            vec2 coords=vec2(r * cos(angle), r * sin(angle)) + c;
            FragColor=texture(texture1, coords);
          }
        });
    );

    --shaders: (background: @shaders(void main() {
          vec2 p=gl_FragCoord.xy / u_resolution.xy;
          FragColor=vec4(p.yx, .8, 1.);
        });
    );

    --hex: ( :after {
        content: \@hex(@rand(9632, 9687));
      });
    --wave: (@grid: 1x60 / 8em 15em;
      @size: 75.8% 1px;
      justify-self: center;
      background: #e6437d;
      opacity: calc(1 - @i / @size);
      transform: rotate(-15deg) translateX(calc(@sin(@i / 4) * π * 10px));
    );
    --flowers: (@shape: clover 5;
      background: hsla(calc(360 - @i * 4), 70%, 68%, @r.8 );
      transform: scale(@r(.2, 1.5)) translate(@m2.@r(±50%)); );
    --triangles:(background: rgba(96, 86, 158, @rand(.9));
      transition: .2s ease @rand(200ms);
      transform: rotate(@rand(360deg));
      clip-path: polygon(@rand(100%) 0, 100% @rand(100%), 0 @rand(100%));
    );
    --lastpick: (background: linear-gradient(@pick-d(45deg, -45deg),
        @pick(#60569e, #e6437d),
        rgba(255, 255, 255, 0),
        @last-pick());
    );
    --repeat: (background: #60569e;
      border-radius: @repeat(4, @rand(30%, 70%));
      @size: 60%;

      :after {
        content: ' ';
        @size: 1em;
        border-radius: 100%;
        background: #@repeat(6, @pick([0-9a-f]));
        transform: scale(@r(.2, 1.5)) translate(@m2.@r(±50%));
      });
    --multiple: (background: linear-gradient(@rand(360deg),
        @multiple(3, (@pick-n(#60569e, #e6437d, #ebbf4d) calc(@n(-1) * 100% / 3),
            @lp calc(@n * 100% / 3))));
    );

    --pie: (border-radius: 50%;
      background: conic-gradient(@stripe(#60569e 10%,
          #e6437d 20%,
          #ebbf4d 30%,
          #321f35));
    );
    --svg: (@grid: 1 / 8em 14em;
      background-size: 100%;
      background-image: @svg(viewBox: 0 0 100 175;

        @M50(path {
            stroke-width: @r.5;
            stroke: @p(#60569e, #e6437d);
            d: M0 0 L@r100 @r175;
          });
      );
    );

    --moon: ( :doodle {
        @grid: 1 / 8em 8em;
        background: #60569e;
        border-radius: 50%;

        filter: @svg-filter(feTurbulence {
            type: fractalNoise;
            baseFrequency: .01 .5;
          }

          feDisplacementMap {
            in: SourceGraphic;
            scale: 50;
          });
      });
    --doodle: (@grid: @p(2, 3) / 8em;
      background-image: @doodle(@grid: @r4 / 100%;
        background: @doodle(@grid: @r4 / 100%;
          background: @svg(viewBox: 0 0 1 1;

            path {
              d: M 0 0 L 1 0 L 1 1;
              fill: #60569e;
            });
        );
      );
    );
  }

  .page {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: grid;
    place-items: center;
    background-color: black;
    position: relative;
    .right{
      right: 40px;
    }
    .left{
      left: 40px;
    }
    .bottom100{
      bottom: 100px;
    }
    .top100{
      top: 100px;
    }
    .blue{
      background-color: rgb(2, 78, 219);
      color: #fff;
    }
    .orange{
      background-color: orange;
      color:aqua;
    }
    .lightgreen{
      background-color: lightgreen;
      color: #00c3ff;
    }
    .plain-orange{
      background-color: transparent;
      color: orange;
    }
    .desc{
      text-shadow:2px 2px #f5f1b9;
      font-size: 24px;
      position: absolute;
      padding: 20px;
      font-weight: 600;
      line-height: 1.5em;
      min-width: 200px;
      border-radius: 4px;
      text-shadow: 1px 3px 1px #f5f1b9;
    }
    .moon {

      width: 8em;
      height: 8em;

      css-doodle {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>