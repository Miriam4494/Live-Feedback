

import type React from "react"
import { useState, useEffect } from "react"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  CircularProgress,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  Badge,
  Tooltip,
  alpha,
  Collapse,
} from "@mui/material"
import {
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Add as AddIcon,
  ViewList as ViewListIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/Store"
import { motion } from "framer-motion"
import { clearUser } from "../redux/UserSlice"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}

const DRAWER_WIDTH = 280
const COLLAPSED_DRAWER_WIDTH = 80

const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [questionsOpen, setQuestionsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  const user = useSelector((state: RootState) => state.User.user)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token ) {
      console.log("user is authenticated", user?.id);
      
      setIsAuthenticated(true)

    }

    // Auto-collapse drawer on tablet
    if (isTablet) {
      setDrawerOpen(false)
    }
  }, [isTablet,user?.id])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usedQuestions")
    dispatch(clearUser())
    setIsAuthenticated(false)
    handleCloseMenu()
    navigate("/")
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const toggleQuestions = () => {
    setQuestionsOpen(!questionsOpen)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const isQuestionsActive = () => {
    return ["/fileupload", "/all", "/myface"].includes(location.pathname)
  }

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: colors.secondary,
        color: "white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: drawerOpen ? 3 : 2,
          display: "flex",
          alignItems: "center",
          justifyContent: drawerOpen ? "space-between" : "center",
        }}
      >
        {drawerOpen && (
          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: "white" }}>
            Feedback Hub
          </Typography>
        )}
        {!isMobile && (
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "white",
              bgcolor: alpha("#fff", 0.1),
              "&:hover": {
                bgcolor: alpha("#fff", 0.2),
              },
            }}
          >
            <ChevronLeftIcon sx={{ transform: drawerOpen ? "none" : "rotate(180deg)" }} />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: alpha("#fff", 0.1) }} />

      {isAuthenticated && (
        <Box
          sx={{
            p: drawerOpen ? 2 : 1,
            display: "flex",
            flexDirection: "column",
            alignItems: drawerOpen ? "flex-start" : "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              flexDirection: drawerOpen ? "row" : "column",
              width: "100%",
              justifyContent: drawerOpen ? "flex-start" : "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: colors.primary,
                width: 40,
                height: 40,
                mb: drawerOpen ? 0 : 1,
                mr: drawerOpen ? 2 : 0,
              }}
            >
              {user?.userName?.charAt(0).toUpperCase() || <AccountCircle />}
            </Avatar>
            {drawerOpen && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "white" }}>
                  {user?.userName || "User"}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha("#fff", 0.7) }} noWrap>
                  {user?.email || ""}
                </Typography>
              </Box>
            )}
          </Box>

          {user?.points !== undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: drawerOpen ? "flex-start" : "center",
                width: "100%",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={(user.points / 100) * 100}
                  size={drawerOpen ? 60 : 50}
                  thickness={4}
                  sx={{
                    color: colors.accent,
                    boxShadow: `0 0 10px ${alpha(colors.accent, 0.3)}`,
                    borderRadius: "50%",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "white", fontSize: drawerOpen ? "1rem" : "0.9rem" }}
                  >
                    {user.points}
                  </Typography>
                  {drawerOpen && (
                    <Typography variant="caption" sx={{ color: alpha("#fff", 0.7), fontSize: "0.7rem" }}>
                      Points
                    </Typography>
                  )}
                </Box>
              </Box>

              {drawerOpen && (
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ color: alpha("#fff", 0.9) }}>
                    Level {Math.floor(user.points / 20) + 1}
                  </Typography>
                  <Typography variant="caption" sx={{ color: alpha("#fff", 0.7) }}>
                    {user.points >= 100 ? "Expert" : user.points >= 50 ? "Intermediate" : "Beginner"}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          <Divider sx={{ borderColor: alpha("#fff", 0.1), width: "100%", mb: 2 }} />
        </Box>
      )}

      <List sx={{ px: drawerOpen ? 2 : 1, flexGrow: 1 }}>
        <ListItem
          component={Link}
          to="/"
          onClick={() => setMobileOpen(false)}
          sx={{
            mb: 1,
            borderRadius: 2,
            bgcolor: isActive("/") ? alpha(colors.primary, 0.2) : "transparent",
            color: isActive("/") ? "white" : alpha("#fff", 0.7),
            justifyContent: drawerOpen ? "flex-start" : "center",
            px: drawerOpen ? 2 : 1,
            py: 1.5,
            "&:hover": {
              bgcolor: alpha(colors.primary, 0.1),
              color: "white",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: drawerOpen ? 40 : 0, mr: drawerOpen ? 0 : "auto" }}>
            <HomeIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Home" />}
        </ListItem>

        {isAuthenticated && (
          <>
            <ListItem
              onClick={toggleQuestions}
              sx={{
              mb: 1,
              borderRadius: 2,
              bgcolor: isQuestionsActive() ? alpha(colors.primary, 0.2) : "transparent",
              color: isQuestionsActive() ? "white" : alpha("#fff", 0.7),
              justifyContent: drawerOpen ? "flex-start" : "center",
              px: drawerOpen ? 2 : 1,
              py: 1.5,
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.1),
                color: "white",
              },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: drawerOpen ? 40 : 0, mr: drawerOpen ? 0 : "auto" }}>
              <QuestionAnswerIcon />
              </ListItemIcon>
              {drawerOpen && (
              <>
                <ListItemText primary="Questions" />
                {questionsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </>
              )}
            </ListItem>

            <Collapse in={drawerOpen && questionsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  component={Link}
                  to="/fileupload"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    pl: 4,
                    py: 1.5,
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: isActive("/fileupload") ? alpha(colors.primary, 0.2) : "transparent",
                    color: isActive("/fileupload") ? "white" : alpha("#fff", 0.7),
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.1),
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Question" />
                </ListItem>

                <ListItem
                  component={Link}
                  to="/all"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    pl: 4,
                    py: 1.5,
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: isActive("/all") ? alpha(colors.primary, 0.2) : "transparent",
                    color: isActive("/all") ? "white" : alpha("#fff", 0.7),
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.1),
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Questions" />
                </ListItem>

                <ListItem
                  component={Link}
                  to="/myface"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    pl: 4,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: isActive("/myface") ? alpha(colors.primary, 0.2) : "transparent",
                    color: isActive("/myface") ? "white" : alpha("#fff", 0.7),
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.1),
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Questions" />
                </ListItem>
              </List>
            </Collapse>

            {!drawerOpen && (
              <>
                <ListItem
                  component={Link}
                  to="/fileupload"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: isActive("/fileupload") ? alpha(colors.primary, 0.2) : "transparent",
                    color: isActive("/fileupload") ? "white" : alpha("#fff", 0.7),
                    justifyContent: "center",
                    px: 1,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.1),
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 0, mr: 0 }}>
                    <AddIcon />
                  </ListItemIcon>
                </ListItem>

                <ListItem
                  component={Link}
                  to="/all"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: isActive("/all") ? alpha(colors.primary, 0.2) : "transparent",
                    color: isActive("/all") ? "white" : alpha("#fff", 0.7),
                    justifyContent: "center",
                    px: 1,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.1),
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 0, mr: 0 }}>
                    <ViewListIcon />
                  </ListItemIcon>
                </ListItem>

                <ListItem
                  component={Link}
                  to="/myface"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: isActive("/myface") ? alpha(colors.primary, 0.2) : "transparent",
                    color: isActive("/myface") ? "white" : alpha("#fff", 0.7),
                    justifyContent: "center",
                    px: 1,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.1),
                      color: "white",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 0, mr: 0 }}>
                    <PersonIcon />
                  </ListItemIcon>
                </ListItem>
              </>
            )}
          </>
        )}
      </List>

      {isAuthenticated && (
        <Box sx={{ p: drawerOpen ? 2 : 1, mt: "auto" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            startIcon={drawerOpen ? <LogoutIcon /> : null}
            sx={{
              borderRadius: 2,
              bgcolor: alpha("#fff", 0.1),
              color: "white",
              justifyContent: drawerOpen ? "flex-start" : "center",
              "&:hover": {
                bgcolor: alpha("#fff", 0.2),
              },
              minWidth: 0,
              px: drawerOpen ? 2 : 1,
            }}
          >
            {!drawerOpen ? <LogoutIcon /> : "Sign Out"}
          </Button>
        </Box>
      )}
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Permanent drawer for desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerOpen ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerOpen ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: "none",
              boxShadow: "0 0 20px rgba(0,0,0,0.1)",
              transition: "width 0.3s ease",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Temporary drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH}px)` },
          transition: "width 0.3s ease",
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "white",
            borderBottom: `1px solid ${alpha("#000", 0.05)}`,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {isMobile && (
                  <IconButton
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                      mr: 2,
                      color: colors.secondary,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}

                {isMobile && (
                  <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                      fontWeight: 700,
                      color: colors.primary,
                      textDecoration: "none",
                    }}
                  >
                    Feedback Hub
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {!isAuthenticated ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      component={Link}
                      to="/auth"
                      variant="contained"
                      sx={{
                        fontWeight: 600,
                        borderRadius: "8px",
                        px: 3,
                        py: 1,
                        bgcolor: colors.primary,
                        "&:hover": {
                          bgcolor: alpha(colors.primary, 0.9),
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <Tooltip title="Notifications">
                      <IconButton sx={{ mx: 1, color: colors.secondary }}>
                        <Badge badgeContent={3} sx={{ "& .MuiBadge-badge": { bgcolor: colors.primary } }}>
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>

                    <IconButton onClick={handleOpenMenu} sx={{ ml: 1 }}>
                      <Avatar
                        sx={{
                          bgcolor: colors.primary,
                          width: 40,
                          height: 40,
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        {user?.userName?.charAt(0).toUpperCase() || <AccountCircle />}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      sx={{ mt: 1 }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          borderRadius: 2,
                          minWidth: 220,
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Box sx={{ px: 3, py: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: colors.primary,
                            width: 60,
                            height: 60,
                            mb: 1,
                          }}
                        >
                          {user?.userName?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: colors.secondary }}>
                          {user?.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem component={Link} to="/settings" onClick={handleCloseMenu}>
                        <ListItemIcon>
                          <SettingsIcon fontSize="small" sx={{ color: colors.secondary }} />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" sx={{ color: colors.primary }} />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
            height: "calc(100% - 64px)",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default AppLayout