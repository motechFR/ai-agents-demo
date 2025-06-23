import { NavLink } from "@remix-run/react";
import React from "react";

interface SidebarItemProps {
  label: string;
  badge?: string | number;
  to?: string;
  isCollapsed?: boolean;
  variant?: 'primary' | 'secondary' | 'sub';
  isActive?: boolean;
}

export function SidebarItem({ 
  label, 
  badge, 
  to, 
  isCollapsed = false, 
  variant = 'primary',
  isActive = false 
}: SidebarItemProps) {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: "#4a5568",
          color: "white",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          fontSize: "0.8rem",
          fontWeight: "bold" as const
        };
      case 'secondary':
        return {
          backgroundColor: "#2d3748",
          color: "white",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "0.7rem",
          fontWeight: "bold" as const
        };
      case 'sub':
        return {
          fontSize: "0.7rem",
          marginRight: "8px"
        };
      default:
        return {};
    }
  };

  const getContainerStyle = () => {
    const baseStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: isCollapsed ? "center" : "flex-start",
      width: "100%",
      whiteSpace: "normal" as const,
      wordBreak: "break-word" as const,
      minHeight: "2em"
    };

    if (variant === 'sub') {
      return {
        ...baseStyle,
        padding: "0.25rem 1rem",
        color: "#a0aec0",
        fontSize: "0.9rem"
      };
    }

    if (variant === 'secondary') {
      return {
        ...baseStyle,
        padding: "0.5rem 1rem",
        color: "#cbd5e0",
        fontWeight: "500",
        cursor: "default",
        borderRadius: "0.375rem"
      };
    }

    return baseStyle;
  };

  const renderBadge = () => {
    if (!badge) return null;

    if (variant === 'sub') {
      return <span style={getBadgeStyle()}>{badge}</span>;
    }

    return (
      <div style={{
        ...getBadgeStyle(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: isCollapsed ? "0" : "8px",
        flexShrink: 0
      }}>
        {badge}
      </div>
    );
  };

  const content = (
    <>
      {renderBadge()}
      {!isCollapsed && <span>{label}</span>}
    </>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        style={getContainerStyle()}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <div style={getContainerStyle()}>
      {content}
    </div>
  );
} 