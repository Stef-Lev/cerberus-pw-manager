import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PasswordItem = ({ record }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="password-panel">
      {record && (
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <h2>{record.title}</h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className="password-details">
              <div className="password-details__labels">
                <span>Url:</span>
                <span>Username:</span>
                <span>Password:</span>
              </div>
              <div className="password-details__values">
                <CopyToClipboard
                  text={record.url}
                  onCopy={() => console.log("copied")}
                >
                  <span>{record.url}</span>
                </CopyToClipboard>
                <CopyToClipboard
                  text={record.username}
                  onCopy={() => console.log("copied")}
                >
                  <span>{record.username}</span>
                </CopyToClipboard>
                <CopyToClipboard
                  text={record.password}
                  onCopy={() => console.log("copied")}
                >
                  <span>{record.password}</span>
                </CopyToClipboard>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default PasswordItem;
