import { makeStyles } from '@material-ui/core/styles';
import heroImage from '../frontpage/hero-image2.jpg';

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
  logoBox: {
    height: 180,
    paddingBottom: 30,
  },
  toolbar: {
    minHeight: 48,
    background: '#d2601a',
  },
  toolbarButton: {
    marginRight: 12,
  },
  button: {
    margin: 16,
  },
  featureBox: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  featurePaper: {
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    background: `linear-gradient(rgba(210, 96, 26, 0.2), rgba(210, 96, 26, 0.2))`,
    maxWidth: '70vw',
  },
  featureImage: {
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    height: '20%',
    width: '20%',
    maxWidth: 180,
    maxHeight: 180,
  },
  featureText: {
    margin: 20,
  },
  testColor: {
    background: 'purple',
  },
}));

export default useStyles;
