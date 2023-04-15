import Card from 'antd/es/card/Card'
import React, { useState, useRef, useEffect } from 'react'

interface Props {
  children: React.ReactNode
  menu: React.ReactNode
}

const ClickableWithMenu: React.FC<Props> = ({ children, menu }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault()
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (containerRect) {
        const menuRect = menuRef.current?.getBoundingClientRect()
        const menuWidth = menuRect?.width || 0
        const menuHeight = menuRect?.height || 0
        const x =
          event.clientX + menuWidth > containerRect.right
            ? containerRect.right - menuWidth
            : event.clientX
        const y =
          event.clientY + menuHeight > containerRect.bottom
            ? containerRect.bottom - menuHeight
            : event.clientY
        setMenuPosition({ x, y })
        setShowMenu(true)
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleContainerClick = () => {
    setShowMenu(false)
  }

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      onContextMenu={(event) => event.preventDefault()}
    >
      {children}
      {showMenu && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPosition.y,
            left: menuPosition.x,
            zIndex: 999,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            boxShadow: '0px 0px 5px #ccc',
            padding: '8px',
          }}
        >
          <div class="dropdown dropdown-bottom dropdown-end">
            {/* <label tabindex="0" class="btn m-1">
              Click
            </label> */}
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          {/* <Card>
            123
            {menu}
          </Card> */}
        </div>
      )}
    </div>
  )
}

export default ClickableWithMenu
