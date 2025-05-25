




// import { Box, Typography, Grid, Button, Container, Card, CardContent, useTheme, Paper, Divider } from "@mui/material"
// import {
//   Feedback as FeedbackIcon,
//   People as PeopleIcon,
//   Star as StarIcon,
//   ArrowForward as ArrowForwardIcon,
//   QuestionAnswer as QuestionAnswerIcon,
//   Lightbulb as LightbulbIcon,
//   EmojiObjects as EmojiObjectsIcon,
//   CheckCircle as CheckCircleIcon,
//   Security as SecurityIcon,
//   Speed as SpeedIcon,
//   Forum as ForumIcon,
//   TrendingUp as TrendingUpIcon,
//   Group as GroupIcon,
// } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"

// const Home = () => {
//   const theme = useTheme()

//   const features = [
//     {
//       icon: <FeedbackIcon sx={{ fontSize: 50, color: "primary.main" }} />,
//       title: "Constructive Feedback",
//       description: "Get valuable insights from peers and experts to improve your work.",
//     },
//     {
//       icon: <PeopleIcon sx={{ fontSize: 50, color: "primary.main" }} />,
//       title: "Community Driven",
//       description: "Join a supportive community that helps each other grow and succeed.",
//     },
//     {
//       icon: <StarIcon sx={{ fontSize: 50, color: "primary.main" }} />,
//       title: "Improve & Grow",
//       description: "Track your progress and see tangible improvements in your skills.",
//     },
//     {
//       icon: <QuestionAnswerIcon sx={{ fontSize: 50, color: "primary.main" }} />,
//       title: "Ask Questions",
//       description: "Get answers to your most pressing questions from knowledgeable peers.",
//     },
//     {
//       icon: <LightbulbIcon sx={{ fontSize: 50, color: "primary.main" }} />,
//       title: "Share Knowledge",
//       description: "Contribute your expertise and help others in the community.",
//     },
//     {
//       icon: <EmojiObjectsIcon sx={{ fontSize: 50, color: "primary.main" }} />,
//       title: "Discover Ideas",
//       description: "Find inspiration and new perspectives from diverse feedback.",
//     },
//   ]

//   const stats = [
//     { value: "10k+", label: "Active Users", icon: <GroupIcon color="primary" /> },
//     { value: "50k+", label: "Questions Answered", icon: <ForumIcon color="primary" /> },
//     { value: "98%", label: "Satisfaction Rate", icon: <CheckCircleIcon color="primary" /> },
//     { value: "24/6", label: "Community Support", icon: <PeopleIcon color="primary" /> },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   }

//   return (
//     <Box sx={{ width: "100%" }}>
//       {/* Hero Section with Gradient Background */}
//       <Box
//         sx={{
//           background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
//           color: "white",
//           py: { xs: 10, md: 16 },
//           borderRadius: { md: "0 0 50px 50px" },
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Decorative Elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: -100,
//             right: -100,
//             width: 300,
//             height: 300,
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.1)",
//           }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: -50,
//             left: -50,
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             background: "rgba(255, 255, 255, 0.1)",
//           }}
//         />

//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
//             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//               <Typography
//                 variant="h2"
//                 component="h1"
//                 sx={{
//                   fontWeight: 800,
//                   mb: 2,
//                   fontSize: { xs: "2.5rem", md: "3.5rem" },
//                   textShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                 }}
//               >
//                 Elevate Your Work Through Feedback
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   mb: 4,
//                   fontWeight: 400,
//                   lineHeight: 1.6,
//                   opacity: 0.9,
//                 }}
//               >
//                 Join our community of creators, developers, and professionals who share insights and help each other
//                 grow.
//               </Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button
//                     component={Link}
//                     to="/auth"
//                     variant="contained"
//                     size="large"
//                     endIcon={<ArrowForwardIcon />}
//                     sx={{
//                       borderRadius: 2,
//                       py: 1.5,
//                       px: 4,
//                       fontWeight: 600,
//                       fontSize: "1rem",
//                       bgcolor: "white",
//                       color: "primary.main",
//                       "&:hover": {
//                         bgcolor: "rgba(255,255,255,0.9)",
//                       },
//                       boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
//                     }}
//                   >
//                     Get Started
//                   </Button>
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button
//                     component={Link}
//                     to="/all"
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                       borderRadius: 2,
//                       py: 1.5,
//                       px: 4,
//                       fontWeight: 600,
//                       fontSize: "1rem",
//                       borderColor: "rgba(255,255,255,0.5)",
//                       color: "white",
//                       "&:hover": {
//                         borderColor: "white",
//                         bgcolor: "rgba(255,255,255,0.1)",
//                       },
//                     }}
//                   >
//                     Browse Questions
//                   </Button>
//                 </motion.div>
//               </Box>
//             </motion.div>
//           </Box>
//         </Container>
//       </Box>

//       {/* Stats Section */}
//       <Container maxWidth="lg" sx={{ mt: -5, position: "relative", zIndex: 10 }}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <Paper
//             elevation={4}
//             sx={{
//               borderRadius: 4,
//               py: 4,
//               px: { xs: 2, md: 6 },
//               boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//               background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
//             }}
//           >
//             <Grid container spacing={3} justifyContent="center">
//               {stats.map((stat, index) => (
//                 <Grid item xs={6} md={3} key={index} sx={{ textAlign: "center" }}>
//                   <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>{stat.icon}</Box>
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       fontWeight: 700,
//                       color: "primary.main",
//                       mb: 1,
//                     }}
//                   >
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     {stat.label}
//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </motion.div>
//       </Container>

//       {/* Features Section */}
//       <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
//         <Box sx={{ textAlign: "center", mb: 8 }}>
//           <Typography
//             variant="h3"
//             component="h2"
//             sx={{
//               fontWeight: 700,
//               color: "text.primary",
//               mb: 2,
//             }}
//           >
//             Why Choose Our Platform?
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "text.secondary",
//               maxWidth: "800px",
//               mx: "auto",
//               fontWeight: 400,
//             }}
//           >
//             Our feedback system is designed to help you grow through constructive feedback and community support.
//           </Typography>
//         </Box>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <motion.div variants={itemVariants}>
//                   <Card
//                     elevation={0}
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       p: 2,
//                       transition: "transform 0.3s, box-shadow 0.3s",
//                       "&:hover": {
//                         transform: "translateY(-8px)",
//                         boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
//                       },
//                       border: "1px solid",
//                       borderColor: "divider",
//                     }}
//                   >
//                     <CardContent sx={{ textAlign: "center", p: 3 }}>
//                       <Box sx={{ mb: 2 }}>{feature.icon}</Box>
//                       <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
//                         {feature.title}
//                       </Typography>
//                       <Typography variant="body1" color="text.secondary">
//                         {feature.description}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </motion.div>
//       </Container>

//       {/* How It Works Section */}
//       <Box sx={{ bgcolor: "grey.50", py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{
//                 fontWeight: 700,
//                 color: "text.primary",
//                 mb: 2,
//               }}
//             >
//               How It Works
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "text.secondary",
//                 maxWidth: "800px",
//                 mx: "auto",
//                 fontWeight: 400,
//               }}
//             >
//               Getting started is easy - follow these simple steps
//             </Typography>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             <Grid item xs={12} sm={6} md={3}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     height: "100%",
//                     transition: "transform 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       bgcolor: "primary.main",
//                       color: "white",
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                       fontSize: "1.5rem",
//                       mx: "auto",
//                       mb: 3,
//                     }}
//                   >
//                     1
//                   </Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//                     Create Account
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Sign up for free and set up your profile to get started with our community.
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} sm={6} md={3}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     height: "100%",
//                     transition: "transform 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       bgcolor: "primary.main",
//                       color: "white",
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                       fontSize: "1.5rem",
//                       mx: "auto",
//                       mb: 3,
//                     }}
//                   >
//                     2
//                   </Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//                     Ask a Question
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Post your question or upload files that you need feedback on from the community.
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} sm={6} md={3}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 viewport={{ once: true }}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     height: "100%",
//                     transition: "transform 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       bgcolor: "primary.main",
//                       color: "white",
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                       fontSize: "1.5rem",
//                       mx: "auto",
//                       mb: 3,
//                     }}
//                   >
//                     3
//                   </Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//                     Receive Feedback
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Get valuable insights and constructive feedback from our community of experts.
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} sm={6} md={3}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 viewport={{ once: true }}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     height: "100%",
//                     transition: "transform 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       bgcolor: "primary.main",
//                       color: "white",
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                       fontSize: "1.5rem",
//                       mx: "auto",
//                       mb: 3,
//                     }}
//                   >
//                     4
//                   </Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//                     Improve & Grow
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Apply the feedback to enhance your work and track your progress over time.
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Benefits Section */}
//       <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
//         <Grid container spacing={6} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <Typography
//                 variant="h3"
//                 component="h2"
//                 sx={{
//                   fontWeight: 700,
//                   color: "text.primary",
//                   mb: 3,
//                 }}
//               >
//                 Benefits of Our Platform
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: "text.secondary",
//                   mb: 4,
//                   fontWeight: 400,
//                 }}
//               >
//                 Discover how our feedback system can transform your work and accelerate your growth
//               </Typography>

//               <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//                 <Box sx={{ display: "flex", gap: 2 }}>
//                   <CheckCircleIcon color="primary" sx={{ fontSize: 30, flexShrink: 0 }} />
//                   <Box>
//                     <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//                       Expert Insights
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Get feedback from professionals and experts in your field who understand the nuances of your work.
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", gap: 2 }}>
//                   <SecurityIcon color="primary" sx={{ fontSize: 30, flexShrink: 0 }} />
//                   <Box>
//                     <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//                       Safe Environment
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Our platform ensures a respectful and constructive environment for sharing and receiving feedback.
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", gap: 2 }}>
//                   <SpeedIcon color="primary" sx={{ fontSize: 30, flexShrink: 0 }} />
//                   <Box>
//                     <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//                       Rapid Improvement
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Accelerate your learning curve and improve faster with targeted feedback from multiple
//                       perspectives.
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </motion.div>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 4,
//                   borderRadius: 4,
//                   background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}10 100%)`,
//                   border: `1px solid ${theme.palette.primary.light}40`,
//                 }}
//               >
//                 <Box sx={{ mb: 3, textAlign: "center" }}>
//                   <TrendingUpIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//                     Growth Metrics
//                   </Typography>
//                 </Box>
//                 <Divider sx={{ mb: 3 }} />
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="body1">Average Improvement Rate</Typography>
//                     <Typography variant="h6" color="primary.main" fontWeight={600}>
//                       78%
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="body1">Feedback Response Time</Typography>
//                     <Typography variant="h6" color="primary.main" fontWeight={600}>
//                       &lt; 24 hours
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="body1">User Satisfaction</Typography>
//                     <Typography variant="h6" color="primary.main" fontWeight={600}>
//                       4.8/5
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="body1">Community Growth</Typography>
//                     <Typography variant="h6" color="primary.main" fontWeight={600}>
//                       +25% monthly
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             </motion.div>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Call to Action */}
//       <Box
//         sx={{
//           background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
//           py: { xs: 8, md: 10 },
//           color: "white",
//           borderRadius: { md: "50px 50px 0 0" },
//         }}
//       >
//         <Container maxWidth="md" sx={{ textAlign: "center" }}>
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{
//                 fontWeight: 700,
//                 mb: 3,
//               }}
//             >
//               Ready to Get Started?
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 mb: 4,
//                 opacity: 0.9,
//                 fontWeight: 400,
//                 maxWidth: "800px",
//                 mx: "auto",
//               }}
//             >
//               Join our community today and start giving and receiving valuable feedback to improve your skills.
//             </Typography>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 component={Link}
//                 to="/auth"
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   borderRadius: 2,
//                   py: 1.5,
//                   px: 5,
//                   fontWeight: 600,
//                   fontSize: "1.1rem",
//                   bgcolor: "white",
//                   color: "primary.main",
//                   "&:hover": {
//                     bgcolor: "rgba(255,255,255,0.9)",
//                   },
//                   boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
//                 }}
//               >
//                 Join Now
//               </Button>
//             </motion.div>
//           </motion.div>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default Home


"use client"

import { Box, Typography, Grid, Button, Container, Card, CardContent } from "@mui/material"
import {
  Feedback as FeedbackIcon,
  People as PeopleIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Lightbulb as LightbulbIcon,
  EmojiObjects as EmojiObjectsIcon,
  CheckCircle as CheckCircleIcon,
  Forum as ForumIcon,
  Group as GroupIcon,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
// import { AddIcon, AllIcon, ImageIcon, LogoutIcon, ProfileIcon, QuestionIcon, ThumbUpIcon } from "./icons/TritoneIcons"
import {  HomeIcon } from "lucide-react"

const Home = () => {
  // const theme = useTheme()

  // New elegant color palette
  const colors = {
    primary: "#E07A5F", // Terracotta
    secondary: "#3D405B", // Dark slate blue
    light: "#F4F1DE", // Cream
    accent: "#81B29A", // Sage green
    dark: "#2D3142", // Dark blue-gray
  }

  const features = [
    {
      icon: <FeedbackIcon sx={{ fontSize: 36, color: colors.primary }} />,
      title: "Constructive Feedback",
      description: "Get valuable insights from peers and experts to improve your work.",
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 36, color: colors.primary }} />,
      title: "Community Driven",
      description: "Join a supportive community that helps each other grow and succeed.",
    },
    {
      icon: <StarIcon sx={{ fontSize: 36, color: colors.primary }} />,
      title: "Improve & Grow",
      description: "Track your progress and see tangible improvements in your skills.",
    },
    {
      icon: <QuestionAnswerIcon sx={{ fontSize: 36, color: colors.primary }} />,
      title: "Ask Questions",
      description: "Get answers to your most pressing questions from knowledgeable peers.",
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 36, color: colors.primary }} />,
      title: "Share Knowledge",
      description: "Contribute your expertise and help others in the community.",
    },
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 36, color: colors.primary }} />,
      title: "Discover Ideas",
      description: "Find inspiration and new perspectives from diverse feedback.",
    },
  ]

  const stats = [
    { value: "10k+", label: "Active Users", icon: <GroupIcon sx={{ color: colors.primary }} /> },
    { value: "50k+", label: "Questions Answered", icon: <ForumIcon sx={{ color: colors.primary }} /> },
    { value: "98%", label: "Satisfaction Rate", icon: <CheckCircleIcon sx={{ color: colors.primary }} /> },
    { value: "24/6", label: "Community Support", icon: <PeopleIcon sx={{ color: colors.primary }} /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "#FFFFFF" }}>
      {/* Minimalist Hero Section */}
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          color: colors.secondary,
          py: { xs: 10, md: 16 },
          position: "relative",
          borderBottom: `1px solid ${colors.light}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    color: colors.secondary,
                    lineHeight: 1.2,
                  }}
                >
                  Elevate Your Work Through Feedback
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: "1.1rem",
                    color: colors.dark,
                    lineHeight: 1.6,
                    maxWidth: "90%",
                  }}
                >
                  Join our community of creators, developers, and professionals who share insights and help each other
                  grow.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 6 }}>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      component={Link}
                      to="/auth"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: colors.primary,
                        color: "white",
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: colors.primary,
                          opacity: 0.9,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      component={Link}
                      to="/all"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: colors.primary,
                        color: colors.primary,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        "&:hover": {
                          borderColor: colors.primary,
                          bgcolor: "rgba(224, 122, 95, 0.04)",
                        },
                      }}
                    >
                      Browse Questions
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 300, md: 400 },
                    bgcolor: colors.light,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.primary,
                    fontSize: "1.2rem",
                    fontWeight: 500,
                  }}
                >
                  {/* Placeholder for hero image */}
                  <Typography variant="body1" color={colors.secondary}>
                    Hero Image
                    <HomeIcon style={{ fontSize: 40, color: "#FF6B6B" }} />
      {/* <QuestionIcon style={{ fontSize: 40, color: "#4ECDC4" }} />
      <FeedbackIcon style={{ fontSize: 40, color: "#FFD166" }} />
      <ProfileIcon style={{ fontSize: 40, color: "#FF6B6B" }} />
      <ListIcon style={{ fontSize: 40, color: "#FFD166" }} />
      <AddIcon style={{ fontSize: 40, color: "#4ECDC4" }} />
      <ImageIcon style={{ fontSize: 40, color: "#4ECDC4" }} />
      <MusicIcon style={{ fontSize: 40, color: "#FF6B6B" }} />
      <StarIcon style={{ fontSize: 40, color: "#FFD166" }} />
      <SettingsIcon style={{ fontSize: 40, color: "#4ECDC4" }} />
      <LogoutIcon style={{ fontSize: 40, color: "#FF6B6B" }} />
      <FilterIcon style={{ fontSize: 40, color: "#4ECDC4" }} />
      <ThumbUpIcon style={{ fontSize: 40, color: "#FF6B6B" }} />
      <AllIcon style={{ fontSize: 40, color: "#4ECDC4" }} /> */}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section - Minimalist */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: colors.primary,
                      mb: 1,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color={colors.secondary} fontWeight={500}>
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section - Clean Grid */}
      <Box sx={{ bgcolor: colors.light, py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: colors.secondary,
                mb: 2,
              }}
            >
              Why Choose Our Platform?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.dark,
                maxWidth: "700px",
                mx: "auto",
                fontSize: "1.1rem",
              }}
            >

              Our feedback system is designed to help you grow through constructive feedback and community support.
            </Typography>
          </Box>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        p: 3,
                        bgcolor: "white",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{ fontWeight: 600, color: colors.secondary }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color={colors.dark}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action - Minimal */}
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: colors.secondary,
                mb: 3,
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.dark,
                mb: 5,
                maxWidth: "700px",
                mx: "auto",
                fontSize: "1.1rem",
              }}
            >
              Join our community today and start giving and receiving valuable feedback to improve your skills.
            </Typography>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: colors.primary,
                  color: "white",
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: colors.primary,
                    opacity: 0.9,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
              >
                Join Now
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </Box>
  )
}

export default Home





// "use client"

// import { Box, Typography, Grid, Button, Container, Card, useTheme } from "@mui/material"
// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"

// const Home = () => {
//   const theme = useTheme()

//   // New elegant color palette
//   const colors = {
//     primary: "#E07A5F", // Terracotta
//     secondary: "#3D405B", // Dark slate blue
//     light: "#F4F1DE", // Cream
//     accent: "#81B29A", // Sage green
//     dark: "#2D3142", // Dark blue-gray
//   }

//   return (
//     <Box sx={{ width: "100%", bgcolor: "#FFFFFF" }}>
//       {/* Hero Section - Modern Split Design */}
//       <Box
//         sx={{
//           position: "relative",
//           overflow: "hidden",
//           minHeight: "90vh",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         {/* Background Elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: { xs: "100%", md: "55%" },
//             height: "100%",
//             bgcolor: colors.light,
//             zIndex: 0,
//             borderTopLeftRadius: { xs: 0, md: 80 },
//             borderBottomLeftRadius: { xs: 0, md: 80 },
//           }}
//         />

//         <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <Typography
//                   variant="h2"
//                   component="h1"
//                   sx={{
//                     fontWeight: 800,
//                     fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
//                     color: colors.secondary,
//                     lineHeight: 1.1,
//                     mb: 3,
//                   }}
//                 >
//                   Share Knowledge,
//                   <br />
//                   <Box component="span" sx={{ color: colors.primary }}>
//                     Grow Together
//                   </Box>
//                 </Typography>

//                 <Typography
//                   variant="body1"
//                   sx={{
//                     fontSize: "1.1rem",
//                     color: colors.dark,
//                     mb: 5,
//                     maxWidth: 500,
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   Our platform connects experts and learners in a collaborative environment where questions are
//                   answered, knowledge is shared, and everyone grows through constructive feedback.
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 3, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
//                   <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                     <Button
//                       component={Link}
//                       to="/auth"
//                       variant="contained"
//                       size="large"
//                       sx={{
//                         bgcolor: colors.primary,
//                         color: "white",
//                         px: 4,
//                         py: 1.8,
//                         borderRadius: 3,
//                         textTransform: "none",
//                         fontSize: "1.1rem",
//                         fontWeight: 600,
//                         boxShadow: `0 8px 20px ${colors.primary}40`,
//                         "&:hover": {
//                           bgcolor: colors.primary,
//                           opacity: 0.9,
//                           boxShadow: `0 10px 25px ${colors.primary}60`,
//                         },
//                         width: { xs: "100%", sm: "auto" },
//                       }}
//                     >
//                       Get Started
//                     </Button>
//                   </motion.div>

//                   <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                     <Button
//                       component={Link}
//                       to="/all"
//                       variant="outlined"
//                       size="large"
//                       sx={{
//                         borderColor: colors.secondary,
//                         color: colors.secondary,
//                         px: 4,
//                         py: 1.8,
//                         borderRadius: 3,
//                         textTransform: "none",
//                         fontSize: "1.1rem",
//                         fontWeight: 600,
//                         "&:hover": {
//                           borderColor: colors.secondary,
//                           bgcolor: `${colors.secondary}08`,
//                         },
//                         width: { xs: "100%", sm: "auto" },
//                       }}
//                     >
//                       Explore Questions
//                     </Button>
//                   </motion.div>
//                 </Box>
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <Box
//                   sx={{
//                     position: "relative",
//                     height: { xs: 300, md: 500 },
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   {/* Main image placeholder */}
//                   <Box
//                     sx={{
//                       width: "80%",
//                       height: "80%",
//                       bgcolor: colors.accent,
//                       borderRadius: 5,
//                       boxShadow: `0 20px 40px ${colors.accent}40`,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       color: "white",
//                       fontSize: "1.2rem",
//                       fontWeight: 500,
//                     }}
//                   >
//                     Hero Image
//                   </Box>

//                   {/* Decorative elements */}
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "10%",
//                       right: "5%",
//                       width: 80,
//                       height: 80,
//                       borderRadius: "50%",
//                       bgcolor: colors.primary,
//                       opacity: 0.7,
//                     }}
//                   />
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       bottom: "15%",
//                       left: "10%",
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       bgcolor: colors.secondary,
//                       opacity: 0.5,
//                     }}
//                   />
//                 </Box>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box sx={{ py: 12, bgcolor: "white" }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{
//                 fontWeight: 700,
//                 color: colors.secondary,
//                 mb: 2,
//               }}
//             >
//               How It Works
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 color: colors.dark,
//                 maxWidth: 700,
//                 mx: "auto",
//                 fontSize: "1.1rem",
//               }}
//             >
//               Our platform makes it easy to ask questions, get feedback, and grow your skills
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {[
//               {
//                 number: "01",
//                 title: "Ask Questions",
//                 description: "Post your questions and upload files to get feedback from the community",
//                 color: colors.primary,
//               },
//               {
//                 number: "02",
//                 title: "Give Feedback",
//                 description: "Share your knowledge by providing valuable feedback to others",
//                 color: colors.accent,
//               },
//               {
//                 number: "03",
//                 title: "Earn Points",
//                 description: "Get rewarded with points for your contributions to the community",
//                 color: colors.secondary,
//               },
//             ].map((feature, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <Card
//                     elevation={0}
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       p: 4,
//                       position: "relative",
//                       overflow: "hidden",
//                       transition: "transform 0.3s",
//                       "&:hover": {
//                         transform: "translateY(-8px)",
//                       },
//                       border: `1px solid ${colors.light}`,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: 8,
//                         height: "100%",
//                         bgcolor: feature.color,
//                       }}
//                     />
//                     <Typography
//                       variant="h2"
//                       sx={{
//                         fontWeight: 800,
//                         color: `${feature.color}20`,
//                         mb: 2,
//                         fontSize: "4rem",
//                       }}
//                     >
//                       {feature.number}
//                     </Typography>
//                     <Typography
//                       variant="h5"
//                       component="h3"
//                       sx={{
//                         fontWeight: 700,
//                         color: colors.secondary,
//                         mb: 2,
//                       }}
//                     >
//                       {feature.title}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       {feature.description}
//                     </Typography>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Call to Action */}
//       <Box
//         sx={{
//           py: 10,
//           bgcolor: colors.secondary,
//           color: "white",
//           borderRadius: { md: "100px 0 0 0" },
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Decorative elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: -100,
//             right: -100,
//             width: 300,
//             height: 300,
//             borderRadius: "50%",
//             bgcolor: `${colors.primary}30`,
//           }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             top: -50,
//             left: "30%",
//             width: 150,
//             height: 150,
//             borderRadius: "50%",
//             bgcolor: `${colors.accent}20`,
//           }}
//         />

//         <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
//           <Box sx={{ textAlign: "center" }}>
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <Typography
//                 variant="h3"
//                 component="h2"
//                 sx={{
//                   fontWeight: 700,
//                   mb: 3,
//                 }}
//               >
//                 Ready to Join Our Community?
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   mb: 5,
//                   maxWidth: 700,
//                   mx: "auto",
//                   fontSize: "1.1rem",
//                   opacity: 0.9,
//                 }}
//               >
//                 Start your journey today and become part of a growing community of learners and experts sharing
//                 knowledge and helping each other succeed.
//               </Typography>
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button
//                   component={Link}
//                   to="/auth"
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     bgcolor: "white",
//                     color: colors.secondary,
//                     px: 5,
//                     py: 2,
//                     borderRadius: 3,
//                     textTransform: "none",
//                     fontSize: "1.1rem",
//                     fontWeight: 600,
//                     boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//                     "&:hover": {
//                       bgcolor: "white",
//                       opacity: 0.95,
//                     },
//                   }}
//                 >
//                   Sign Up Now
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default Home
