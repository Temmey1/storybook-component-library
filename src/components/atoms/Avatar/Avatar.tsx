import React, { useState, useCallback } from "react";
import { AvatarProps, AvatarData } from "./avatar.types";

const SingleAvatar: React.FC<AvatarProps & { avatarData?: AvatarData; index?: number }> = ({
  src,
  alt,
  name = "",
  size = "md",
  shape = "circle",
  backgroundColor,
  bordered = false,
  status,
  className = "",
  onError,
  textColor = "#ffffff",
  groupOverlap = 16,
  avatarData,
  index = 0,
}) => {
  const [imageError, setImageError] = useState(false);

  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Generate consistent background color from name
  const generateBackgroundColor = (name: string) => {
    const colors = [
      "bg-blue-800",
      "bg-red-800",
      "bg-green-800",
      "bg-yellow-900",
      "bg-purple-800",
      "bg-pink-800",
      "bg-indigo-800",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Handle image load error
  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  const sizeClasses = {
    xs: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10",
    sm: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
    md: "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16",
    lg: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20",
    xl: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg"
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-red-500",
    away: "bg-yellow-500"
  };

  const avatarSrc = avatarData?.src || src;
  const avatarAlt = avatarData?.alt || alt;
  const avatarName = avatarData?.name || name;
  const avatarStatus = avatarData?.status || status;
  const showInitials = !avatarSrc || imageError;
  const initials = getInitials(avatarName);
  const bgColor = backgroundColor || generateBackgroundColor(avatarName);

  return (
    <div 
      className="relative inline-flex"
      style={avatarData ? { marginLeft: index === 0 ? 0 : -groupOverlap } : undefined}
    >
      <div
        className={`
          ${sizeClasses[size]}
          ${shapeClasses[shape]}
          ${bordered ? "border-2 ring-2 ring-white" : ""}
          ${showInitials ? bgColor : ""}
          ${className}
          ${avatarData ? "ring-2 ring-white" : ""}
          flex items-center justify-center overflow-hidden
        `}
        role="img"
        aria-label={avatarAlt || avatarName || "User avatar"}
        data-testid="avatar"
      >
        {!showInitials ? (
          <img
            src={avatarSrc}
            alt={avatarAlt || avatarName}
            onError={handleError}
            className="w-full h-full object-cover"
            data-testid="avatar-image"
          />
        ) : (
          <span 
            className="font-semibold" 
            style={{ color: textColor }}
            aria-hidden="true"
            data-testid="avatar-initials"
          >
            {initials}
          </span>
        )}
      </div>

      {avatarStatus && (
        <span 
          className={`
            absolute bottom-0 right-0 
            block h-3 w-3 
            rounded-full ring-2 ring-white 
            ${statusClasses[avatarStatus] || 'bg-gray-500'}
          `}
          role="status"
          aria-label={`User status: ${avatarStatus}`}
          data-testid="avatar-status"
        />
      )}
    </div>
  );
};

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { group, maxGroupSize = 3 } = props;

  if (!group || group.length === 0) {
    return <SingleAvatar {...props} />;
  }

  const visibleAvatars = group.slice(0, maxGroupSize);
  const remainingCount = Math.max(0, group.length - maxGroupSize);

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <SingleAvatar
          key={index}
          {...props}
          avatarData={avatar}
          index={index}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={`
            avatar
            avatar-${props.size || "md"}
            avatar-${props.shape || "circle"}
            bg-gray-200
            ${props.bordered ? "avatar-bordered" : ""}
            ${props.className || ""}
            ring-2 ring-white
          `}
          style={{ marginLeft: -(props.groupOverlap || 16) }}
        >
          <span 
            className="avatar-initials font-semibold text-gray-600"
            aria-label={`${remainingCount} more users`}
          >
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};
