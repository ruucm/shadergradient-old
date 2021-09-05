export const MyItem = ({ onClick, children, visible }) => (
  <div
    style={{
      width: 'fit-content',
      fontSize: 60,
      opacity: visible ? 1 : 0.3,
      borderBottom: visible ? '4px solid black' : '0px solid black',
      cursor: visible ? 'default' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
)
