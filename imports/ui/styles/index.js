import {spacing, typography, zIndex} from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lightBlue900, lightBlue800, lightBlue700, cyan500, cyan200, 
        red500, grey300, grey500, white} from 'material-ui/styles/colors';

const MAIN_DISPLAY_WIDTH = '600px';
const PRIMARY1_COLOR = lightBlue900;

const styles = {  
    primary1Color: PRIMARY1_COLOR,
    mainDisplayWidth: MAIN_DISPLAY_WIDTH,
    
    muiTheme: getMuiTheme({
        palette: {
            primary1Color: PRIMARY1_COLOR,
        }
    }),

    navDrawerLogo: {
         display: 'flex',
         flexDirection: 'row',
         flexWrap: 'nowrap',
         justifyContent: 'flex-start',
         alignItems: 'center',
         
         height: '64px',

        cursor: 'pointer',
        //fontSize: 24,
        color: typography.textFullWhite,
        //lineHeight: `${spacing.desktopKeylineIncrement}px`,
        //fontWeight: typography.fontWeightMedium,
        backgroundColor: lightBlue800,
        //paddingLeft: spacing.desktopGutter,
        paddingLeft: '0px',
        marginTop: 0,
        paddingBottom: '0px',
    },
         
    logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightMedium,
        backgroundColor: lightBlue800,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8,
    },
  
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },

    gridList: {
        width: 900,
        //height: 500,
        overflowY: 'auto',
        marginBottom: 24,
    },
    
    topBar: {
        top: 0,
        marginTop: 0,
        marginLeft: 0,
        position: 'fixed',
        //width: 360,
    },
    
    listHeading: {
        backgroundColor: grey300,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
    },
    
    webPage: {
        backgroundColor: grey300,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 1,
    },
    
    papers: {
        top: 0,
        marginTop: 72,
        display: 'flex',
        alignItems: 'top',
    },
    
    leftColumnDiv: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 68,
        bottom: 0,
        height: 'calc(100% - 68px)',
        width: 350,
        zIndex: 10000,
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitScrollbar: { width: '5px'},
    },
    
    rightColumnDiv: {
        position: 'absolute',
        left: 360,
        right: 0,
        top: 68,
        bottom: 0,
        height: 'calc(100% - 68px)',
        width: 'calc(100% - 370px)',
        zIndex: 10000,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    
    leftColumn: {
        width: 350,
        //height: 2000,
        margin: 10,
        padding: 0,
        textAlign: 'left',
        display: 'inline-block',
    },
    
    rightColumn: {
        width: 600,
        height: 2000,
        margin: 0,
        padding: 0,
        textAlign: 'left',
        display: 'inline-block',
    },
    
    icon: {
        marginLeft: 10,
        marginRight: 12,
        marginTop: 0,
    },
    
    iconSmall: {
        width: 18,
        height: 18,
        marginLeft: 10,
        marginRight: 24,
        marginTop: 0,
    },

    iconTiny: {
        width: 12,
        height: 12,
        marginLeft: 12,
        marginRight: 4,
        marginTop: 0,
        marginBottom: 0,
        color: grey500,
    },
    
    icon_listFiles: {
        width: 12,
        height: 12,
        marginLeft: 20,
        marginRight: 4,
        marginTop: 0,
        marginBottom: 0,
        color: grey500,
    },
    
    horizontalCardSample: {
        width: '100%',
        marginTop: 10,
        
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        //height: '100%',
    },
    
    cardSample: {
        width: 315,
        marginTop: 10,
        
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        //height: '100%',
    },
    
    sample: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        border: '1px',
    },
    

    
    verticalStyle: {
        width: '100%',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContext: 'stretch',
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: 0,
        marginRight: 0,
    }, 
            
    horizontalStyle: {
        width: '100%',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        flex: 1,
        marginLeft: 0,
        marginRight: 0,
    }, 
    
    smallIconsDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10,
        color: grey500,   
        marginTop: 4,     
    },
    
    
};

export default styles;

