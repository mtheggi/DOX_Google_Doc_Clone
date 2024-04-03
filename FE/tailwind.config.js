/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'plex': ['IBM Plex Sans', 'sans-serif'],
      },
      fontSize: {
        "2xs": ["10px", "12px"],
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
      },
      colors: {
        reddit_dark: "#030303",
        reddit_search: "#1A282C",
        reddit_navbar: "#0C1416",
        reddit_menu: "#0E1A1C",
        reddit_sky: "#50E9F4",
        reddit_search_light: "#213236",
        reddit_greenyDark: "#0B1416",
        reddit_blue: "#1460d1",
        reddit_light_blue: "#1870f4",
        reddit_lightGreen: "#0F1A1C",
        reddit_hover: "#141F23",
        reddit_darkRecent: "#04090A",
        reddit_downvote: "#6A5CFF",
        reddit_upvote: "#D93A01",
        reddit_links: "#629FFF",
        reddit_green_success: "50a332",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        // Add as many as you need
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        // Add as many as you need
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        // Add as many as you need
      },
      spacing: {
        '1%': '1%',
        '1.5%': '1.5%',
        '2%': '2%',
        '3%': '3%',
        '4%': '4%',
        '5%': '5%',
        '5.5%': '5.5%',
        '5.6%': '5.6%',
        '5.7%': '5.7%',
        '6%': '6%',
        '7%': '7%',
        '8%': '8%',
        '9%': '9%',
        '10%': '10%',
        '11%': '11%',
        '12%': '12%',
        '13%': '13%',
        '14%': '14%',
        '15%': '15%',
        '16%': '16%',
        '17%': '17%',
        '18%': '18%',
        '19%': '19%',
        '20%': '20%',
        '21%': '21%',
        '22%': '22%',
        '23%': '23%',
        '24%': '24%',
        '25%': '25%',
        '26%': '26%',
        '27%': '27%',
        '28%': '28%',
        '29%': '29%',
        '30%': '30%',
        '31%': '31%',
        '32%': '32%',
        '33%': '33%',
        '34%': '34%',
        '35%': '35%',
        '36%': '36%',
        '37%': '37%',
        '38%': '38%',
        '39%': '39%',
        '40%': '40%',
        '41%': '41%',
        '42%': '42%',
        '43%': '43%',
        '44%': '44%',
        '45%': '45%',
        '46%': '46%',
        '47%': '47%',
        '48%': '48%',
        '49%': '49%',
        '50%': '50%',
        '51%': '51%',
        '52%': '52%',
        '53%': '53%',
        '54%': '54%',
        '55%': '55%',
        '56%': '56%',
        '57%': '57%',
        '58%': '58%',
        '59%': '59%',
        '60%': '60%',
        '61%': '61%',
        '62%': '62%',
        '63%': '63%',
        '64%': '64%',
        '65%': '65%',
        '66%': '66%',
        '67%': '67%',
        '68%': '68%',
        '69%': '69%',
        '70%': '70%',
        '74%': '74%',
        '75%': '75%',
        '80%': '80%',
        '90%': '90%',
        '91%': '91%',
        '92%': '92%',
        '93%': '93%',
        '94%': '94%',
        '95%': '95%',
        '96%': '96%',
        '97%': '97%',
        '98%': '98%',
        '99%': '99%',
        '100%': '100%',


        '9': '36px',
        '9.1': '36.5px',
        '9.2': '36.8px',
        '9.3': '37px',
        '9.4': '37.5px',
        '9.5': '38px',
        '9.6': '38.5px',
        '9.7': '39px',
        '9.8': '39.5px',
        '9.9': '39.9px',
        '10': `40px`,
        '11': '44px',
        '12': '48px',
        '13': '52px',
        '13.5': '54px',
        '14': '56px',
        '14.5': '58px',
        '15': '60px',
        '16': '64px',
        '17': '68px',
        '18': '72px',
        '19': '76px',
        '20': '80px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
        '24': '96px',
        '25': '100px',
        '26': '104px',
        '27': '108px',
        '28': '112px',
        '29': '116px',
        '30': '120px',
        '31': '124px',
        '32': '128px',
        '33': '132px',
        '34': '136px',
        '35': '140px',
        '36': '144px',
        '37': '148px',
        '38': '152px',
        '39': '156px',
        '40': '160px',
        '41': '164px',
        '42': '168px',
        '43': '172px',
        '44': '176px',
        '45': '180px',
        '46': '184px',
        '47': '188px',
        '48': '192px',
        '49': '196px',
        '50': '200px',
        '51': '204px',
        '52': '208px',
        '53': '212px',
        '54': '216px',
        '55': '220px',
        '56': '224px',
        '57': '228px',
        '58': '232px',
        '59': '236px',
        '60': '240px',
        '61': '244px',
        '62': '248px',
        '63': '252px',
        '64': '256px',
        '65': '260px',
        '66': '264px',
        '67': '268px',
        '68': '272px',
        '69': '276px',
        '70': '280px',
        '71': '284px',
        '72': '288px',
        '73': '292px',
        '74': '296px',
        '75': '300px',
        '76': '304px',
        '77': '308px',
        '78': '312px',
        '79': '316px',
        '80': '320px',
        '81': '324px',
        '82': '328px',
        '83': '332px',
        '84': '336px',
        '85': '340px',
        '86': '344px',
        '87': '348px',
        '88': '352px',
        '89': '356px',
        '90': '360px',
        '91': '364px',
        '92': '368px',
        '93': '372px',
        '94': '376px',
        '95': '380px',
        '96': '384px',
        '97': '388px',
        '98': '392px',
        '99': '396px',
        '100': '400px',
        '101': '404px',
        '102': '408px',
        '103': '412px',
        '104': '416px',
        '125': '500px',
        '115': '460px',

        '116': '464px',
        '117': '468px',
        '118': '472px',
        '119': '476px',
        '120': '480px',
        '121': '484px',
        '122': '488px',
        '123': '492px',
        '124': '496px',
        '125': '500px',
        '126': '504px',
        '127': '508px',
        '128': '512px',
        '129': '516px',
        '130': '520px',
        '131': '524px',
        '132': '528px',
        '148': '592px',
        '149': '596px',
        '150': '600px',
        '151': '604px',
        '152': '608px',
        '153': '612px',
        '154': '616px',
        '155': '620px',
        '156': '624px',
        '157': '628px',
        '158': '632px',
        '159': '636px',
        '160': '640px',
        '164': '656px',
        '200': '800px',
        '168': '672px',
        '169': '676px',
        '170': '680px',
        '171': '684px',
        '172': '688px',
        '173': '692px',
        '174': '696px',
        '175': '700px',
        '176': '704px',
        '177': '708px',
        '178': '712px',
        '179': '716px',
        '180': '720px',
        '181': '724px',
        '182': '728px',
        '183': '732px',
        '184': '736px',
        '185': '740px',
        '186': '744px',
        '187': '748px',
        '188': '752px',
        '189': '756px',
        '190': '760px',
        '192': '768px',
        '198': '792px',
        '0.1px': '0.04px',
        '1px': '1px',
      },
      borderWidth: {
        '3': '3px',
      },
      borderWidth: {
        '3': '3px',
      },

      scale: {
        85: ".85",

      },
    },
    screens: {
      xs: "350px",
      // => @media (min-width: 470px) { ... }

      msm: "500px",

      sm: "530px",
      // => @media (min-width: 640px) { ... }

      md: "703px",
      // => @media (min-width: 768px) { ... }

      lg: "906px",
      // => @media (min-width: 956px) { ... }

      xl: "1100px",
      // => @media (min-width: 1200px) { ... }

      mxl: "1412px",
      // => @media (min-width: 1412px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
