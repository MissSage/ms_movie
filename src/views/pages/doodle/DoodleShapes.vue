<template>
  <p>圆形（clover内饰）：</p>
  <css-doodle use="var(--circle),var(--clover-grid)"></css-doodle>
  <p>三角形（hypocycloid内饰）：</p>
  <css-doodle use="var(--triangle),var(--hypocycloid-grid)"></css-doodle>
  <p>做一个病毒（bud内饰）：</p>
  <css-doodle use="var(--hypocycloid),var(--bud-grid)"></css-doodle>
  <p>风车：</p>
  <css-doodle use="var(--circle),var(--windmill-grid)"></css-doodle>
</template>
<script lang="ts" setup>
import 'css-doodle'
</script>
<style lang="scss">
css-doodle {
  --circle: (: doodle {@shape: circle;});
  --triangle: (: doodle {@shape: triangle;});
  --hypocycloid: (: doodle {@shape: hypocycloid 5;});
  --windmill: (: doodle {@shape: windmill;});
  --windmill-grid: (
    @grid: 7 / 8em; @even {@shape: windmill; background: #60569e; transform: scale(1) rotate(-60deg)
      ;}
  );
  --clover-grid: (
    @grid: 7 / 8em; @even {@shape: clover 5; background: #60569e; transform: scale(1) rotate(-60deg)
      ;}
  );
  --hypocycloid-grid: (
    @grid: 7 / 8em; @even {@shape: hypocycloid 5; background: #60569e; transform: scale(1) rotate(
        -60deg
      ) ;}
  );
  --bud-grid: (
    @grid: 7 / 8em; @even {@shape: bud 10; background: #60569e; transform: scale(1) rotate(-60deg) ;}
  );
}
</style>
