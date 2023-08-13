<template>
  <el-header>
    <!-- <css-doodle
      click-to-update
      use="var(--container),var(--flowers)"
    ></css-doodle> -->
  </el-header>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.el-header {
  --el-header-padding: 0;
  --el-header-height: 40px;

  display: flex;
  align-items: center;
  overflow: hidden;

  .header-wrapper {
    position: absolute;
    padding: 0 12px;
  }
}

.hamburger {
  cursor: pointer;
}

.collapse {
  transform: rotate(90deg);
}

css-doodle {
  --container: (
    : doodle{@grid: 20x1; @size: 100vmax 40px; background: #0a0c27;}
  );
  --flowers: (
    @shape: clover 5; background: hsl(calc(360 - @i * 4) 70% 68% / @r.8) ;
      transform: scale(@r (0.2, 1.5)) translate(@m2. @r (±50%)) ;
  );
}
</style>
