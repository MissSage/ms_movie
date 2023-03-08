<template>
  <div class="wrapper">
    <p>生成各种三角形：</p>
    <css-doodle use="var(--triangle)"></css-doodle>
    <p>指定第nth个元素，并获取其index:</p>
    <css-doodle use="var(--nth)"></css-doodle>
    <p>odd:</p>
    <css-doodle use="var(--odd)"></css-doodle>
    <p>even:</p>
    <css-doodle use="var(--even)"></css-doodle>
    <p>at:</p>
    <css-doodle use="var(--at)"></css-doodle>
    <p>生成随机样式的框，并生成随机大小的点：</p>
    <css-doodle use="var(--random)"></css-doodle>
    <p>选择指定行设置样式：</p>
    <css-doodle use="var(--row)"></css-doodle>
    <p>指定odd行的样式：</p>
    <css-doodle use="var(--rowodd)"></css-doodle>
    <p>指定even列的样式：</p>
    <css-doodle use="var(--coleven)"></css-doodle>
    <p>选择满足指定条件的块以设置样式(i ≤ 8 || i ≥ 18)：</p>
    <css-doodle use="var(--match)"></css-doodle>
    <p>选择满足指定条件的块以设置样式(x ≤ y)：</p>
    <css-doodle use="var(--match1)"></css-doodle>
    <p>更复杂的条件：</p>
    <css-doodle use="var(--matchComplex)"></css-doodle>
  </div>
</template>
<script lang="ts" setup>
import 'css-doodle'
</script>
<style lang="scss">
css-doodle {
  --triangle: (
    @grid: 5 / 8em; --d: @p (45deg, -45deg, 135deg, -135deg) ; --lg:
      linear-gradient(@var (--d), #60569e 50%, #0000 0) ; background: @var
      (--lg) 0 0 / 100% 100%,
    @var (--lg) 0 0 / 50% 50%;
  );
  --nth: (
    @grid: 5 / 8em;: nth-child(1) {background: #60569e;} @nth (5) {background: #60569e;}
      @nth (3n + 8) {background: #e6437d;} @nth (1, 5, 3n + 8) {: after {content:
      @index; color: #fff;}}
  );
  --odd: (@grid: 5 / 8em; @odd {background: #60569e;});
  --even: (@grid: 5 / 8em; @even {background: #60569e;});
  --at: (@grid: 5 / 8em; @at (4, 2) {background: #60569e;});

  --random: (
    @grid: 5 / 8em; @random {border-top: 1px solid #60569e;} @random {border-left:
      1px solid #60569e;} @random (0.2) {: after {content: "" ; background: hsl(
        @rand (360),
        60%,
        70%
      ) ; @size: @rand (3px) ;}}
  );
  --row: (
    @grid: 5 / 8em; @row (3) {background: #60569e;: after {content: @row; color:
      #fff;}}
  );
  --rowodd: (
    @grid: 5 / 8em; @row (odd) {background: #60569e;: after {content: @index;
      color: #fff;}}
  );
  --coleven: (
    @grid: 5 / 8em; @col (even) {background: #60569e;: after {content: @col;
      color: #fff;}}
  );
  --match: (
    @grid: 5 / 8em; @match (i <=8 || i >=18) {background: #60569e;: after {content:
      @index; color: #fff;}}
  );
  --match1: (
    @grid: 5 / 8em; @match (x<=y) {background: #60569e;: after {content: @index;
      color: #fff;}}
  );
  --matchComplex: (
    @grid: 21 / 8em; @match (tan.cos.sin(x * y) > 1) {background: #60569e;}
  );
}
</style>
