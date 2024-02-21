import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    borderRadius:10
  },
  hover: {
    backgroundColor: "black",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icons: {
    marginTop: 0
  }
});
export { useStyles }