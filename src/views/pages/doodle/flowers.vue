<template>
  <div class="wrapper">
    <div class="moon">
      <div class="moon-box">
        <css-doodle click-to-update use="var(--moon)"></css-doodle>
      </div>
    </div>
    <css-doodle click-to-update use="var(--shaders)"></css-doodle>
    <css-doodle click-to-update use="var(--shaders1)"></css-doodle>
    <css-doodle click-to-update use="var(--container),var(--hex)"></css-doodle>
    <css-doodle click-to-update use="var(--wave)"></css-doodle>
    <css-doodle
      click-to-update
      use="var(--container),var(--flowers)"
    ></css-doodle>
    <css-doodle
      click-to-update
      use="var(--container),var(--triangles)"
    ></css-doodle>
    <css-doodle
      click-to-update
      use="var(--container),var(--lastpick)"
    ></css-doodle>
    <css-doodle
      click-to-update
      use="var(--container),var(--repeat)"
    ></css-doodle>
    <css-doodle
      click-to-update
      use="var(--container),var(--multiple)"
    ></css-doodle>
    <css-doodle click-to-update use="var(--pie)"></css-doodle>
    <css-doodle click-to-update use="var(--svg)"></css-doodle>
    <css-doodle
      click-to-update
      use="var(--container),var(--doodle)"
    ></css-doodle>
  </div>
</template>
<script lang="ts" setup>
import 'css-doodle'
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: auto;
  width: 100%;
  height: 100%;
}

css-doodle {
  overflow: hidden;
  width: 100%;
  height: 100vh;

  --container: (: doodle {@grid: 12 / 100vmax; background: #0a0c27;});
  --shaders1: (
    @grid: 1 / 8em; background: @shaders
      (
        texture1 {@grid: 1 / 100%; background: linear-gradient(
            45deg,
            @stripe. @m20. @p (#fff4e0, #f8b501, #06acb5, #17191d, #fc3d3c)
          ) ;} fragment {void main() {vec2 p = gl_FragCoord.xy /
          u_resolution.xy; vec2 c = vec2(0.5, 0.5) ; vec2 uv = p.xy - c; float
          R=3.141593; float len =
          length(uv * vec2(u_resolution.x / u_resolution.y, 1)) ; float angle =
          atan(uv.y, uv.x) + R * smoothstep(0.75, 0, len) ; float r = length(uv) +
          .1; vec2 coords = vec2(r * cos(angle), r * sin(angle)) + c; fragcolor
          = texture(texture1, coords) ;}}
      )
      ;
  );
  --shaders: (
    background: @shaders
      (
        void main() {vec2 p = gl_fragcoord.xy / u_resolution.xy; fragcolor = vec4(
            p.yx,
            0.8,
            1
          ) ;},
      )
      ;
  );
  --hex: (: after {content: \@hex (@rand (9632, 9687)) ;});
  --wave: (
    @grid: 1x60 / 8em 15em; @size: 75.8% 1px; justify-self: center; background:
      #e6437d; opacity: calc(1 - @i / @size) ; transform: rotate(-15deg)
      translateX(calc(@sin (@i / 4) * π * 10px)) ;
  );
  --flowers: (
    @shape: clover 5; background: hsl(calc(360 - @i * 4) 70% 68% / @r.8) ;
      transform: scale(@r (0.2, 1.5)) translate(@m2. @r (±50%)) ;
  );
  --triangles: (
    background: rgba(96, 86, 158, @rand (0.9)) ; transition: 0.2s ease @rand
      (
        200ms,
      )
      ; transform: rotate(@rand (360deg)) ; clip-path:
      polygon(@rand (100%) 0, 100% @rand (100%), 0 @rand (100%)) ;
  );
  --lastpick: (
    background:
      linear-gradient(
        @pick-d (45deg, -45deg),
        @pick (#60569e, #e6437d),
        rgb(255 255 255 / 0%),
        @last-pick ()
      )
      ;
  );
  --repeat: (
    background: #60569e; border-radius: @repeat
      (
        4,
        @rand (30%, 70%),
      )
      ; @size: 60%;: after {content: ' ' ; @size: 1em; border-radius: 100%; background:
      #@repeat
      (
        6,
        @pick ([0-9a-f]),
      )
      ; transform: scale(@r (0.2, 1.5)) translate(@m2. @r (±50%)) ;}
  );
  --multiple: (
    background:
      linear-gradient(
        @rand (360deg),
        @multiple
          (
            3,
            (
              @pick-n (#60569e, #e6437d, #ebbf4d) calc(@n (-1) * 100% / 3),
              @lp calc(@n * 100% / 3)
            )
          )
      )
      ;
  );
  --pie: (
    border-radius: 50%; background:
      conic-gradient(@stripe (#60569e 10%, #e6437d 20%, #ebbf4d 30%, #321f35)) ;
  );
  --svg: (
    @grid: 1 / 8em 14em; background-size: 100%; background-image: @svg
      (
        viewBox: 0 0 100 175; @M50
          (
            path {stroke-width: @r.5; stroke: @p (#60569e, #e6437d) ; d: M0 0 L @r100
              @r175;},
          )
          ;
      )
      ;
  );
  --moon: (
    : doodle {@grid: 1 / 8em 8em; background: #60569e; border-radius: 50%;
      filter: @svg-filter
      (
        feTurbulence {type: fractalNoise; baseFrequency: 0.01 .5;}
          feDisplacementMap {in: SourceGraphic; scale: 50;}
      )
      ;}
  );
  --doodle: (
    @grid: @p (2, 3) / 8em; background-image: @doodle
      (
        @grid: @r4 / 100%; background: @doodle
          (
            @grid: @r4 / 100%; background: @svg
              (viewBox: 0 0 1 1; path {d: M 0 0 L 1 0 L 1 1; fill: #60569e;}) ;
          )
          ;
      )
      ;
  );
}

.moon {
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: black;
  place-items: center;

  .moon-box {
    width: 8em;
    height: 8em;

    css-doodle {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
