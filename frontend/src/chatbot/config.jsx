import { createChatBotMessage } from 'react-chatbot-kit';
import Options from './Options';
import Alternatives from './Alternatives';
import ProductList from './ProductList';
import CategoryList from './CategoryList';

const config = {
  botName: "RushBot",
  initialMessages: [
    createChatBotMessage(
      "Hi! I'm RushBot, your grocery assistant. I can help you find products, show deals, recommend categories, and add items to your cart.",
      {
        widget: "options",
      }
    )
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "alternatives",
      widgetFunc: (props) => <Alternatives {...props} />,
    },
    {
      widgetName: "productList",
      widgetFunc: (props) => <ProductList {...props} />,
    },
    {
      widgetName: "categoryList",
      widgetFunc: (props) => <CategoryList {...props} />,
    },
  ],
};

export default config;