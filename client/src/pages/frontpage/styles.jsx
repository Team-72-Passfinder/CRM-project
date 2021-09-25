import makeStyles from '@mui/styles/makeStyles';
import heroImage from './hero-image2.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: ' #fff1e1',
  },
  hero: {
    marginBottom: 10,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  logoHero: {
    maxWidth: 180,
    maxHeight: 180,
    animation: `$spin 20s linear infinite`,
    alignSelf: 'center',
  },
  toolbar: {
    minHeight: 48,
    background: '#d2601a',
  },
  toolbarButton: {
    marginRight: 12,
  },
  featureSectionBox: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  featurePaper: {
    padding: 10,
    margin: 20,
    background: `linear-gradient(rgba(210, 96, 26, 0.2), rgba(210, 96, 26, 0.2))`,
    maxWidth: '70vw',
  },
  featureImage: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    height: '20%',
    width: '20%',
    maxWidth: 120,
    maxHeight: 120,
  },
  aboutUsSectionBox: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  aboutUsTextBox: {
    maxWidth: '50vw',
  },
  footerSectionBox: {
    padding: 10,
    color: 'white',
    //background: '#d2601a', //orange
    background: '#1D3C45',
  },
  footerGridItem: {
    alignItems: 'center',
    display: 'flex',
  },
  footerImage: {
    maxWidth: 60,
    maxHeight: 60,
    animation: `$spin 10s linear infinite`,
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  testColor: {
    background: 'purple',
  },
}));

export default useStyles;
