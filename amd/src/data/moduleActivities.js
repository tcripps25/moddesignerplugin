const moduleActivities = [
  {
    section: 'Week 1',
    name: 'Introduction Week',
    items: [
      { id: '101', name: 'Introduction to the Course', type: 'Book' },
      { id: '102', name: 'Introductory Quiz', type: 'Quiz' },
      { id: '103', name: 'Live Chat for Q&A', type: 'Chat' }
    ]
  },
  {
    section: 'Week 2',
    name: 'Getting Started',
    items: [
      { id: '201', name: 'Forum Discussion: Getting to Know Each Other', type: 'Forum' },
      { id: '202', name: 'Choice Activity: Preferred Learning Styles', type: 'Choice' },
      { id: '203', name: 'Lesson: Course Overview', type: 'Lesson' },
      { id: '204', name: 'Feedback: First Impressions', type: 'Feedback' }
    ]
  },
  {
    section: 'Week 3',
    name: 'Basic Concepts',
    items: [
      { id: '301', name: 'Introduction to Basic Concepts', type: 'Lesson' },
      { id: '302', name: 'Discussion Forum: Basic Concepts', type: 'Forum' },
      { id: '303', name: 'Feedback on Basic Concepts', type: 'Feedback' }
    ]
  },
  {
    section: 'Week 4',
    name: 'Interactive Learning',
    items: [
      { id: '401', name: 'Collaborative Wiki', type: 'Wiki' },
      { id: '402', name: 'Interactive Database', type: 'Database' },
      { id: '403', name: 'Live Chat: Discuss Project Ideas', type: 'Chat' }
    ]
  },
  {
    section: 'Week 5',
    name: 'Mid-Course Review',
    items: [
      { id: '501', name: 'Glossary of Key Terms', type: 'Glossary' },
      { id: '502', name: 'Choice Activity: Mid-Course Check-in', type: 'Choice' },
      { id: '503', name: 'Midterm Quiz on Wiseflow', type: 'Wiseflow' },
      { id: '504', name: 'Review Quiz', type: 'Quiz' }
    ]
  },
  {
    section: 'Week 6',
    name: 'Deep Dive into Topics',
    items: [
      { id: '601', name: 'In-depth Reading: Advanced Topics', type: 'Book' },
      { id: '602', name: 'Workshop on Advanced Concepts', type: 'Workshop' },
      { id: '603', name: 'Supplementary Reading List', type: 'Reading List' }
    ]
  },
  {
    section: 'Week 7',
    name: 'Practical Applications',
    items: [
      { id: '701', name: 'Lesson on Practical Applications', type: 'Lesson' },
      { id: '702', name: 'Quiz: Practical Knowledge Test', type: 'Quiz' },
      { id: '703', name: 'Feedback on Application Skills', type: 'Feedback' }
    ]
  },
  {
    section: 'Week 8',
    name: 'Collaboration & Teamwork',
    items: [
      { id: '801', name: 'Collaborative Wiki Project', type: 'Wiki' },
      { id: '802', name: 'Discussion Forum: Group Projects', type: 'Forum' },
      { id: '803', name: 'Live Chat: Collaborative Strategies', type: 'Chat' }
    ]
  },
  {
    section: 'Week 9',
    name: 'Mid-Term Assessment',
    items: [
      { id: '901', name: 'Mid-Term Quiz', type: 'Quiz' },
      { id: '902', name: 'Assessment Submission via Wiseflow', type: 'Wiseflow' }
    ]
  },
  {
    section: 'Week 10',
    name: 'Feedback & Reflection',
    items: [
      { id: '1001', name: 'Mid-Term Feedback', type: 'Feedback' },
      { id: '1002', name: 'Live Chat: Reflect on the Mid-Term', type: 'Chat' }
    ]
  },
  {
    section: 'Week 11',
    name: 'Research Methods',
    items: [
      { id: '1101', name: 'Book: Introduction to Research Methods', type: 'Book' },
      { id: '1102', name: 'Lesson on Research Skills', type: 'Lesson' },
      { id: '1103', name: 'Forum: Share Research Ideas', type: 'Forum' }
    ]
  },
  {
    section: 'Week 12',
    name: 'Group Projects',
    items: [
      { id: '1201', name: 'Workshop on Team Dynamics', type: 'Workshop' },
      { id: '1202', name: 'Database for Group Projects', type: 'Database' },
      { id: '1203', name: 'Choice: Select Project Topics', type: 'Choice' }
    ]
  },
  {
    section: 'Week 13',
    name: 'Interactive Learning 2',
    items: [
      { id: '1301', name: 'Wiki: Expand Group Projects', type: 'Wiki' },
      { id: '1302', name: 'Forum: Share Progress on Projects', type: 'Forum' },
      { id: '1303', name: 'Live Chat: Project Feedback', type: 'Chat' }
    ]
  },
  {
    section: 'Week 14',
    name: 'Advanced Topics',
    items: [
      { id: '1401', name: 'Book: Advanced Reading', type: 'Book' },
      { id: '1402', name: 'Lesson on Advanced Techniques', type: 'Lesson' }
    ]
  },
  {
    section: 'Week 15',
    name: 'Review & Feedback',
    items: [
      { id: '1501', name: 'Feedback: How are we doing?', type: 'Feedback' },
      { id: '1502', name: 'Glossary Expansion: Add More Terms', type: 'Glossary' }
    ]
  },
  {
    section: 'Week 16',
    name: 'Practical Applications 2',
    items: [
      { id: '1601', name: 'Choice: Select Application Area', type: 'Choice' },
      { id: '1602', name: 'Workshop on Practical Skills', type: 'Workshop' }
    ]
  },
  {
    section: 'Week 17',
    name: 'Self-Paced Learning',
    items: [
      { id: '1701', name: 'Book: Self-Paced Reading', type: 'Book' },
      { id: '1702', name: 'Curated Reading List 2', type: 'Reading List' }
    ]
  },
  {
    section: 'Week 18',
    name: 'Project Work',
    items: [
      { id: '1801', name: 'Database for Project Resources', type: 'Database' },
      { id: '1802', name: 'Forum: Peer Feedback on Projects', type: 'Forum' }
    ]
  },
  {
    section: 'Week 19',
    name: 'Peer Learning',
    items: [
      { id: '1901', name: 'Collaborative Wiki: Peer Review', type: 'Wiki' },
      { id: '1902', name: 'Lesson on Peer Learning', type: 'Lesson' }
    ]
  },
  {
    section: 'Week 20',
    name: 'Quiz and Assessment',
    items: [
      { id: '2001', name: 'Final Quiz Preparation', type: 'Quiz' },
      { id: '2002', name: 'Final Submission via Wiseflow', type: 'Wiseflow' }
    ]
  },
  {
    section: 'Week 21',
    name: 'Feedback and Reflection',
    items: [
      { id: '2101', name: 'Final Feedback', type: 'Feedback' },
      { id: '2102', name: 'Live Chat: Final Reflections', type: 'Chat' }
    ]
  },
  {
    section: 'Week 22',
    name: 'Capstone Week',
    items: [
      { id: '2201', name: 'Workshop: Capstone Project', type: 'Workshop' },
      { id: '2202', name: 'Forum: Share Capstone Progress', type: 'Forum' }
    ]
  },
  {
    section: 'Week 23',
    name: 'Capstone Presentations',
    items: [
      { id: '2301', name: 'Lesson: Presenting Your Capstone', type: 'Lesson' },
      { id: '2302', name: 'Wiki: Capstone Project Documentation', type: 'Wiki' }
    ]
  },
  {
    section: 'Week 24',
    name: 'Course Wrap-Up',
    items: [
      { id: '2401', name: 'Choice: Course Wrap-Up Survey', type: 'Choice' },
      { id: '2402', name: 'Final Reading List', type: 'Reading List' }
    ]
  }
]

export { moduleActivities }
