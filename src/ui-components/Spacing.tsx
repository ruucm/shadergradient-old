import * as React from "react"

export const Spacing = ({
  guide = false,
  width = "100%",
  height = "20px",
  ...props
}) => (
  <div
    {...props}
    style={{
      position: "relative",
      width,
      height,
      background: "hsl(100, 37%, 79%)",
      opacity: "var(--guide-opacity)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        whiteSpace: "nowrap",
        fontSize: "8px",
      }}
    >
      {guide && (
        <>
          {/* @ts-ignore */}
          {props?.width !== "100%" && `${props.width}`}
          {/* @ts-ignore */}
          {props?.width !== "100%" && props?.height !== "100%" && ` / `}
          {/* @ts-ignore */}
          {props?.height !== "100%" && `${props.height}`}
        </>
      )}
    </div>
  </div>
)
