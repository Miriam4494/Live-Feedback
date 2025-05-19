import { SvgIcon, type SvgIconProps } from "@mui/material"

// Custom tritone icons inspired by https://www.svgrepo.com/collection/lifestyle-tritone-icons/

export const HomeIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M3 10.182V22h18V10.182L12 2L3 10.182Z"
      fill="#FFE8E8"
      stroke="#FF6B6B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V22"
      fill="#FFD1D1"
      stroke="#FF6B6B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const QuestionIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#E5F9F7" stroke="#4ECDC4" strokeWidth="1.5" />
    <path d="M12 16V15.5" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 14C12 11 15 11.5 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9"
      stroke="#4ECDC4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const FeedbackIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
      fill="#E5F9F7"
      stroke="#4ECDC4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 12H8.01" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12H12.01" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 12H16.01" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const ProfileIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="5" fill="#FFE8E8" stroke="#FF6B6B" strokeWidth="1.5" />
    <path
      d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
      fill="#FFD1D1"
      stroke="#FF6B6B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const ListIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="#FFF5E0"
      stroke="#FFD166"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7 8H17" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 12H17" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 16H13" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const AddIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#E5F9F7" stroke="#4ECDC4" strokeWidth="1.5" />
    <path d="M12 8V16" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12H16" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const ImageIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="#E5F9F7"
      stroke="#4ECDC4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="8.5"
      cy="8.5"
      r="1.5"
      fill="#4ECDC4"
      stroke="#4ECDC4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M21 15L16 10L5 21" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const MusicIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M9 18V5L21 3V16" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" fill="#FFE8E8" stroke="#FF6B6B" strokeWidth="1.5" />
    <circle cx="18" cy="16" r="3" fill="#FFE8E8" stroke="#FF6B6B" strokeWidth="1.5" />
    <path d="M9 9L21 7" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const StarIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="#FFF5E0"
      stroke="#FFD166"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77"
      stroke="#FFD166"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const SettingsIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" fill="#E5F9F7" stroke="#4ECDC4" strokeWidth="1.5" />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"
      fill="#E5F9F7"
      stroke="#4ECDC4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const LogoutIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="#FF6B6B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16 17l5-5-5-5" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12H9" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const FilterIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
      fill="#E5F9F7"
      stroke="#4ECDC4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const ThumbUpIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
      fill="#FFE8E8"
      stroke="#FF6B6B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export const AllIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="#E5F9F7" stroke="#4ECDC4" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1" fill="#FFE8E8" stroke="#FF6B6B" strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#E5F9F7" stroke="#4ECDC4" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1" fill="#FFF5E0" stroke="#FFD166" strokeWidth="1.5" />
  </SvgIcon>
)
