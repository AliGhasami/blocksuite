import {
  defineConfig,
  presetUno,
  transformerCompileClass,
  transformerVariantGroup,
  transformerDirectives,
  type UserConfig
} from 'unocss'
import presetAutoprefixer from 'unocss-preset-autoprefixer'
import { prefixClsCore, preSetOp, UnoCssConfigCore } from '@mahdaad/tokens'
export default defineConfig({
  ...UnoCssConfigCore,
  presets: [presetUno(preSetOp), presetAutoprefixer()],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
    transformerCompileClass({ classPrefix: `${prefixClsCore}-`, trigger: `g:` })
  ]
} as unknown as UserConfig)
