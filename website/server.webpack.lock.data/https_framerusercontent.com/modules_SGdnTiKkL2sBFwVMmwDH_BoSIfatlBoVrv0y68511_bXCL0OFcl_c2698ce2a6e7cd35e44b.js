import { jsx as _jsx } from "react/jsx-runtime" // Generated by Framer (42fb435)
import * as React from "react"
import { motion, LayoutGroup } from "framer-motion"
import {
  addFonts,
  withCSS,
  cx,
  useAddVariantProps,
  useVariantState,
} from "framer"
import { useRandomID } from "https://framer.com/m/framer/randomID.js@^2.0.0"
const enabledGestures = { jB8tWluZT: { hover: true } }
const cycleOrder = ["jB8tWluZT"]
const variantClassNames = { jB8tWluZT: "framer-v-u7cto2" }
const humanReadableVariantMap = {}
const transitions = {
  default: {
    type: "spring",
    ease: [0.44, 0, 0.56, 1],
    duration: 0.3,
    delay: 0,
    stiffness: 500,
    damping: 60,
    mass: 1,
  },
}
const Component = /*#__PURE__*/ React.forwardRef(function (
  {
    style,
    className,
    layoutId,
    width,
    height,
    variant: outerVariant = "jB8tWluZT",
    ...restProps
  },
  ref
) {
  const outerVariantId = humanReadableVariantMap[outerVariant]
  const variant = outerVariantId || outerVariant
  const {
    variants,
    baseVariant,
    gestureVariant,
    classNames,
    transition,
    setVariant,
    setGestureState,
  } = useVariantState({
    defaultVariant: "jB8tWluZT",
    variant,
    transitions,
    variantClassNames,
    enabledGestures,
    cycleOrder,
  })
  const variantProps = React.useMemo(() => ({}), [])
  const addVariantProps = useAddVariantProps(
    baseVariant,
    gestureVariant,
    variantProps
  )
  const defaultLayoutId = useRandomID()
  return /*#__PURE__*/ _jsx(LayoutGroup, {
    id: layoutId !== null && layoutId !== void 0 ? layoutId : defaultLayoutId,
    children: /*#__PURE__*/ _jsx(motion.div, {
      initial: variant,
      animate: variants,
      className: cx("framer-tIevt", classNames),
      style: { display: "contents", pointerEvents: "auto" },
      onHoverStart: () => setGestureState({ isHovered: true }),
      onHoverEnd: () => setGestureState({ isHovered: false }),
      onTapStart: () => setGestureState({ isPressed: true }),
      onTap: () => setGestureState({ isPressed: false }),
      onTapCancel: () => setGestureState({ isPressed: false }),
      children: /*#__PURE__*/ _jsx(motion.div, {
        ...restProps,
        layoutId: "jB8tWluZT",
        className: cx("framer-u7cto2", className),
        style: { backgroundColor: "rgb(255, 255, 255)", ...style },
        "data-framer-name": "Variant 1",
        transition: transition,
        ref: ref,
        ...addVariantProps("jB8tWluZT"),
        children: /*#__PURE__*/ _jsx(motion.div, {
          layoutId: "zYthgmNYi",
          className: "framer-5ocyps",
          style: { backgroundColor: "rgb(243, 89, 89)" },
          transition: transition,
          ...addVariantProps("zYthgmNYi"),
          variants: {
            "jB8tWluZT-hover": { backgroundColor: "rgb(89, 150, 243)" },
          },
        }),
      }),
    }),
  })
})
const css = [
  '.framer-tIevt [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none;}',
  ".framer-tIevt * { box-sizing: border-box; }",
  ".framer-tIevt .framer-u7cto2 { position: relative; overflow: hidden; width: 322px; height: 159px; }",
  ".framer-tIevt .framer-5ocyps { position: absolute; overflow: visible; width: 109px; height: 62px; left: 77px; top: 45px; flex: none; }",
  ".framer-tIevt.framer-v-u7cto2 .framer-u7cto2 { cursor: pointer; }",
  ".framer-tIevt.framer-v-u7cto2.hover .framer-5ocyps { width: 154px; height: 82px; right: 21px; bottom: 17px; left: auto; top: auto; flex: none; }",
]
/**
 * This is a generated Framer component.
 * @framerIntrinsicHeight 159
 * @framerIntrinsicWidth 322
 * @framerCanvasComponentVariantDetails {"propertyName": "variant", "data": {"default": {"layout": ["fixed", "fixed"]}, "FcqvWbir0": {"layout": ["fixed", "fixed"]}}}
 */ const FramerbXCL0OFcl = withCSS(Component, css)
export default FramerbXCL0OFcl
FramerbXCL0OFcl.displayName = "Hey"
FramerbXCL0OFcl.defaultProps = { width: 322, height: 159 }
addFonts(FramerbXCL0OFcl, [])
export const __FramerMetadata__ = {
  exports: {
    Props: { type: "tsType", annotations: { framerContractVersion: "1" } },
    default: {
      type: "reactComponent",
      name: "FramerbXCL0OFcl",
      slots: [],
      annotations: {
        framerContractVersion: "1",
        framerIntrinsicHeight: "159",
        framerCanvasComponentVariantDetails:
          '{"propertyName": "variant", "data": {"default": {"layout": ["fixed", "fixed"]}, "FcqvWbir0": {"layout": ["fixed", "fixed"]}}}',
        framerIntrinsicWidth: "322",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
}
//# sourceMappingURL=./bXCL0OFcl.map
