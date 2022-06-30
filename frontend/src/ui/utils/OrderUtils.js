function getWorkflowOrdered(workflowSteps) {
  return workflowSteps.reduce((acc, workflow) => {
    const step = {
      id: workflow.step_id,
      order: workflow.step_order,
      activity: workflow.type_label,
    };
    let steps = acc[workflow.id]?.steps || [];
    steps = [...steps, step];
    return {
      ...acc,
      [workflow.id]: {
        label: workflow.label,
        steps: steps.sort((s1, s2) => s1.order - s2.order),
      },
    };
  }, {});
}

function getEndDate(pieces, date) {
  let totalDays;
  if (pieces <= 100) {
    totalDays = 0;
  } else if (pieces <= 200) {
    totalDays = 1;
  } else if (pieces <= 500) {
    totalDays = 2;
  } else {
    totalDays = 4;
  }
  const endDate = new Date().setDate(date.getDate() + totalDays);
  return new Date(endDate);
}

export const OrderUtils = {
  getWorkflowOrdered,
  getEndDate,
};
