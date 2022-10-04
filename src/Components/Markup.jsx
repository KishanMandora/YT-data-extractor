import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";

function Markup({ str }) {
  return (
    <Highlight {...defaultProps} code={str} theme={theme} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export { Markup };
