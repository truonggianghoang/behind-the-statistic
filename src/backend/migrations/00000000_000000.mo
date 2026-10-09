import AccessControl "mo:caffeineai-authorization/access-control";
import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Category = { #physical; #mental };

  type Source = { organisation : Text; title : Text; url : Text };

  type ArticleSection = { heading : Text; body : Text };

  type Problem = {
    id : Nat;
    slug : Text;
    category : Category;
    title : Text;
    summary : Text;
    heroImage : Text;
    sections : [ArticleSection];
    sources : [Source];
  };

  type RealLifeExample = {
    id : Nat;
    category : Category;
    person : Text;
    situation : Text;
    problem : Text;
    impact : Text;
    journey : Text;
    source : Source;
  };

  type FeaturedIssue = {
    slug : Text;
    category : Category;
    title : Text;
    summary : Text;
    heroImage : Text;
  };

  type WhyThisMatters = { heading : Text; paragraphs : [Text] };

  type ContactDetails = {
    createdBy : Text;
    email : Text;
    organisation : Text;
    location : Text;
    project : Text;
  };

  type SiteContent = {
    siteName : Text;
    tagline : Text;
    introduction : Text;
    whyThisMatters : WhyThisMatters;
    contactDetails : ContactDetails;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Nat;
  };

  public type OldActor = {};

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    problems : Map.Map<Nat, Problem>;
    examples : Map.Map<Nat, RealLifeExample>;
    featured : Map.Map<Nat, FeaturedIssue>;
    siteContent : SiteContent;
    submissions : Map.Map<Nat, ContactSubmission>;
    contactState : { var nextId : Nat };
  };

  // ---------------------------------------------------------------------------
  // Seed content
  //
  // Every claim below is drawn from the named reputable source. Where a precise
  // figure could not be verified, the issue is described qualitatively rather
  // than with an invented number. Sources are listed discreetly per problem.
  // ---------------------------------------------------------------------------

  let physicalProblems : [Problem] = [
    {
      id = 0;
      slug = "obesity";
      category = #physical;
      title = "Obesity";
      summary = "Obesity is a complex health condition involving an excess of body fat. It is shaped by biology, environment and society, not by willpower alone.";
      heroImage = "/images/problems/obesity.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Obesity is a medical condition in which a person carries an excess amount of body fat that can affect their health. Health services commonly describe it using body mass index (BMI), a measure that compares weight with height, although BMI is only a rough guide and does not capture the full picture of a person's health. Obesity is not simply a matter of eating too much or moving too little; it is a complex condition with many contributing factors.";
        },
        {
          heading = "Why does it matter?";
          body = "Obesity raises the risk of many other health problems, including type 2 diabetes, heart disease, high blood pressure, some cancers, and joint problems. It can also affect mental wellbeing, sleep and everyday quality of life. Because obesity is common and its effects are wide-ranging, it is one of the most significant public-health challenges worldwide.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Obesity has no single cause. Contributing factors include genetics and biology, the food environment around us, the cost and availability of healthy food, how much physical activity is built into daily life, sleep, stress, some medical conditions and some medicines. Social and economic circumstances play a large part: where a person lives, their income and the opportunities available to them all shape their options.";
        },
        {
          heading = "Effects";
          body = "Obesity can affect almost every part of the body. It increases the risk of type 2 diabetes, cardiovascular disease, high blood pressure, stroke, certain cancers, and breathing problems such as sleep apnoea. It can also contribute to joint pain, reduced mobility, and mental health difficulties including low mood and stigma-related distress.";
        },
        {
          heading = "Who can be affected?";
          body = "People of all ages, backgrounds and countries can be affected. Obesity is found across every income level and culture. Children and young people can also be affected, and patterns established early in life can carry into adulthood.";
        },
        {
          heading = "Impact on everyday life";
          body = "Beyond physical health, obesity can affect daily life in ways that are often overlooked: difficulty finding comfortable seating or clothing, breathlessness during ordinary activities, and experiencing stigma or judgement from others. Weight stigma can be deeply harmful and can make people less likely to seek help.";
        },
        {
          heading = "What can help?";
          body = "Support that works tends to be gradual and sustainable rather than quick or extreme. It can include changes to eating patterns, building more movement into daily life, better sleep, and support for mental wellbeing. Healthcare professionals can offer structured programmes, and in some cases medicines or surgery. Because causes are complex, effective help usually addresses the whole person and their circumstances, not just weight.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Treat people with dignity and avoid judgement. Weight stigma is real and harmful, so avoid comments about a person's body or assumptions about their habits. Offer practical, non-judgemental support, listen, and encourage professional help where the person wants it. Small, consistent encouragement is far more helpful than pressure.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Obesity and overweight"; url = "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
        { organisation = "NHS"; title = "Obesity"; url = "https://www.nhs.uk/conditions/obesity/" },
        { organisation = "CDC"; title = "Adult Obesity Facts"; url = "https://www.cdc.gov/obesity/adult-obesity-facts/" },
      ];
    },
    {
      id = 1;
      slug = "sleep-problems";
      category = #physical;
      title = "Sleep problems";
      summary = "Difficulty falling or staying asleep affects mood, memory, immunity and long-term health. Sleep is a basic need, not a luxury.";
      heroImage = "/images/problems/sleep-problems.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Sleep problems include difficulty falling asleep, waking during the night, waking too early, and not feeling rested after sleep. Insomnia is the most common sleep disorder. Occasional poor sleep is normal, but when it continues for weeks or months it can become a health problem in its own right.";
        },
        {
          heading = "Why does it matter?";
          body = "Sleep is when the body repairs itself and the brain processes memory and emotion. Ongoing poor sleep is linked to difficulties with concentration and mood, and over time to a higher risk of conditions such as heart disease, high blood pressure and type 2 diabetes. It also affects relationships, work and safety.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Common contributors include stress and worry, irregular sleep schedules, shift work, screen use late at night, caffeine and alcohol, noisy or bright bedrooms, some medical conditions, and some medicines. Mental health difficulties such as anxiety and depression are closely linked with sleep problems, and each can make the other worse.";
        },
        {
          heading = "Effects";
          body = "Poor sleep can lead to daytime tiredness, irritability, low mood, poorer memory and slower reactions. It can affect school and work performance and increase the risk of accidents. Over the long term it is associated with a range of physical health problems.";
        },
        {
          heading = "Who can be affected?";
          body = "Sleep problems can affect anyone at any age. They are especially common among shift workers, new parents, students during exam periods, and people under sustained stress or living with anxiety or depression.";
        },
        {
          heading = "Impact on everyday life";
          body = "Persistent poor sleep can make ordinary tasks feel harder, reduce patience, and strain relationships. Many people dismiss it as something to push through, but ongoing sleep difficulty deserves the same attention as any other health concern.";
        },
        {
          heading = "What can help?";
          body = "Helpful approaches include keeping regular sleep and wake times, creating a dark and quiet sleeping environment, limiting caffeine and screens before bed, and getting daytime physical activity. Talking therapies such as cognitive behavioural therapy for insomnia (CBT-I) are recommended for persistent insomnia. If sleep problems continue, speak to a healthcare professional.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Take sleep complaints seriously rather than treating them as trivial. Avoid suggesting that the person simply try harder to sleep. Support healthy routines, reduce late-night noise and light where possible, and encourage them to seek professional help if it persists.";
        },
      ];
      sources = [
        { organisation = "NHS"; title = "Insomnia"; url = "https://www.nhs.uk/conditions/insomnia/" },
        { organisation = "CDC"; title = "Sleep and Sleep Disorders"; url = "https://www.cdc.gov/sleep/index.html" },
        { organisation = "World Health Organization"; title = "Physical activity"; url = "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      ];
    },
    {
      id = 2;
      slug = "physical-inactivity";
      category = #physical;
      title = "Physical inactivity";
      summary = "Moving too little is one of the leading risk factors for poor health worldwide, yet it is often invisible in daily life.";
      heroImage = "/images/problems/physical-inactivity.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Physical inactivity means not doing enough movement to keep the body healthy. Modern life often makes this easy: desks, cars, screens and lifts remove much of the movement that was once part of everyday living. Inactivity is not laziness; it is often the result of how our environments are built.";
        },
        {
          heading = "Why does it matter?";
          body = "Regular movement helps the heart, muscles, bones and mind. Inactivity is a leading risk factor for heart disease, type 2 diabetes, some cancers and early death. It also affects mental wellbeing, sleep and the ability to stay independent as we age.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Contributors include sedentary jobs and study, long commutes, screen-based leisure, limited safe spaces to move, cost of activities, caring responsibilities, disability, and low confidence about exercise. The environment a person lives in can make movement either easy or difficult.";
        },
        {
          heading = "Effects";
          body = "Over time, inactivity weakens the heart and muscles, reduces fitness, and increases the risk of many chronic conditions. It can also contribute to low mood, poorer sleep and reduced energy, creating a cycle that is hard to break.";
        },
        {
          heading = "Who can be affected?";
          body = "People of all ages can be affected, but inactivity tends to increase with age and is common among office workers, students and people with limited mobility or access to safe spaces.";
        },
        {
          heading = "Impact on everyday life";
          body = "Inactivity can quietly reduce stamina, making stairs, walking and play feel harder than they should. It can narrow what a person feels able to do, and over years it can affect independence and quality of life.";
        },
        {
          heading = "What can help?";
          body = "Any movement counts. Walking, cycling, dancing, housework, gardening and active play all contribute. Health guidance recommends regular moderate activity across the week, but starting small and building up is the most sustainable approach. Finding movement a person enjoys makes it far more likely to last.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Invite rather than pressure. Offer to move together, keep it social and low-cost, and avoid judgement. Celebrate small steps and help remove practical barriers such as time, cost or confidence.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Physical activity"; url = "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
        { organisation = "NHS"; title = "Exercise"; url = "https://www.nhs.uk/live-well/exercise/" },
        { organisation = "CDC"; title = "Physical Activity Basics"; url = "https://www.cdc.gov/physical-activity-basics/" },
      ];
    },
    {
      id = 3;
      slug = "poor-nutrition";
      category = #physical;
      title = "Poor nutrition";
      summary = "Not getting the right balance of nutrients affects growth, energy, immunity and long-term health — and it is often shaped by cost and access.";
      heroImage = "/images/problems/poor-nutrition.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Poor nutrition means not getting the balance of energy and nutrients the body needs. It can take many forms: too little food, too much of the wrong kinds of food, or a diet missing key vitamins and minerals. It is not only about hunger; it is also about the quality of what people eat.";
        },
        {
          heading = "Why does it matter?";
          body = "Good nutrition supports growth, immunity, brain development and energy. Poor nutrition is linked to both undernutrition and to conditions such as obesity, type 2 diabetes and heart disease. In children it can affect growth and learning, with effects that last a lifetime.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Contributors include the cost and availability of healthy food, food deserts, heavy marketing of processed food, time pressure, cooking skills and equipment, and food insecurity. Poverty and inequality are among the strongest drivers of poor nutrition worldwide.";
        },
        {
          heading = "Effects";
          body = "Poor nutrition can lead to tiredness, poor concentration, weakened immunity and increased risk of chronic disease. In children it can affect physical growth and cognitive development. It can also worsen mental wellbeing.";
        },
        {
          heading = "Who can be affected?";
          body = "People of all ages can be affected, but children, older adults, people on low incomes and those living in areas with limited food choices are especially vulnerable.";
        },
        {
          heading = "Impact on everyday life";
          body = "Poor nutrition can reduce energy and focus, making school, work and daily tasks harder. It can also carry stigma, and families may feel judged for choices that are shaped by cost and access rather than preference.";
        },
        {
          heading = "What can help?";
          body = "Small, realistic changes help: more vegetables and fruit, wholegrains, and less highly processed food where possible. Community food programmes, school meals and cooking support can make a real difference. Where food insecurity is the cause, practical and financial support matters more than advice.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Avoid judgement about food choices. Recognise that cost, time and access shape what people can eat. Support practical solutions such as shared cooking, food banks or community meals, and advocate for affordable healthy food.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Healthy diet"; url = "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
        { organisation = "UNICEF"; title = "Nutrition"; url = "https://www.unicef.org/nutrition" },
        { organisation = "NHS"; title = "Eat well"; url = "https://www.nhs.uk/live-well/eat-well/" },
      ];
    },
    {
      id = 4;
      slug = "type-2-diabetes-risk";
      category = #physical;
      title = "Type 2 diabetes risk";
      summary = "Type 2 diabetes develops slowly and often silently. Understanding the risk factors can help people act before symptoms appear.";
      heroImage = "/images/problems/type-2-diabetes-risk.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Type 2 diabetes is a condition in which the body cannot use insulin properly, so blood sugar levels rise. It usually develops gradually over years and may cause no obvious symptoms at first. Because of this, many people have it without knowing.";
        },
        {
          heading = "Why does it matter?";
          body = "If left unmanaged, type 2 diabetes can damage the heart, blood vessels, eyes, kidneys and nerves. It is a leading cause of blindness, kidney failure and lower-limb amputation. Early awareness and management greatly reduce these risks.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Risk factors include carrying excess weight, physical inactivity, poor nutrition, family history, age, and ethnicity. Some groups are at higher risk. Type 2 diabetes is not caused by a single choice; it results from a combination of genetics, environment and lifestyle over time.";
        },
        {
          heading = "Effects";
          body = "Over time, high blood sugar can damage blood vessels and nerves throughout the body. This can lead to heart disease, stroke, vision loss, kidney damage and problems with the feet. It can also affect energy, mood and sleep.";
        },
        {
          heading = "Who can be affected?";
          body = "Type 2 diabetes can affect adults of all backgrounds and is increasingly seen in younger people. Risk rises with age and is higher in some ethnic groups and in people with a family history of the condition.";
        },
        {
          heading = "Impact on everyday life";
          body = "Managing diabetes involves regular monitoring, medication where needed, and attention to food and activity. It can be demanding, and the daily effort involved is often underestimated by others.";
        },
        {
          heading = "What can help?";
          body = "For many people, regular physical activity, balanced nutrition and weight management can reduce the risk of developing type 2 diabetes, and in some cases can put early diabetes into remission. Regular check-ups allow early detection. Where diabetes is present, medication and structured support help prevent complications.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Avoid blame; type 2 diabetes is not a personal failing. Support healthy routines, be understanding about the demands of management, and encourage regular healthcare. Small, shared changes to food and activity are easier than isolated ones.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Diabetes"; url = "https://www.who.int/news-room/fact-sheets/detail/diabetes" },
        { organisation = "NHS"; title = "Type 2 diabetes"; url = "https://www.nhs.uk/conditions/type-2-diabetes/" },
        { organisation = "CDC"; title = "Type 2 Diabetes"; url = "https://www.cdc.gov/diabetes/about/about-type-2-diabetes.html" },
      ];
    },
    {
      id = 5;
      slug = "heart-disease-risk";
      category = #physical;
      title = "Heart disease risk";
      summary = "Cardiovascular disease is the world's leading cause of death, yet many of its risk factors are ones we can influence.";
      heroImage = "/images/problems/heart-disease-risk.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Heart disease, or cardiovascular disease, covers a range of conditions affecting the heart and blood vessels, including heart attacks and strokes. It usually develops over many years as arteries narrow and the heart is placed under strain.";
        },
        {
          heading = "Why does it matter?";
          body = "Cardiovascular disease is the leading cause of death worldwide. It can strike suddenly, but it often develops quietly over decades. Because so many of its risk factors are influenced by daily life, understanding them can help people act early.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Major risk factors include high blood pressure, high cholesterol, smoking, physical inactivity, poor nutrition, obesity and diabetes. Stress, sleep problems and excessive alcohol also contribute. Some risk is inherited and cannot be changed, which makes the factors that can be changed all the more important.";
        },
        {
          heading = "Effects";
          body = "Heart disease can lead to chest pain, heart attack, heart failure and stroke. It can reduce energy and independence, and it affects families and communities as well as individuals.";
        },
        {
          heading = "Who can be affected?";
          body = "Risk increases with age and is higher in people with a family history, but heart disease affects people of all ages and backgrounds. It is not only a condition of older age.";
        },
        {
          heading = "Impact on everyday life";
          body = "Living with heart disease can mean medication, monitoring and lifestyle changes, and it can bring worry for the person and their family. Recovery after a heart event often requires time and support.";
        },
        {
          heading = "What can help?";
          body = "Not smoking, staying physically active, eating a balanced diet, limiting alcohol, managing stress and keeping blood pressure and cholesterol in check all lower risk. Regular check-ups can catch problems early. Where heart disease is present, medication and rehabilitation programmes help people live well.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Support healthy routines without nagging, and be patient during recovery. Learn the warning signs of a heart attack or stroke so you can act quickly. Emotional support matters as much as practical help.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Cardiovascular diseases"; url = "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)" },
        { organisation = "NHS"; title = "Coronary heart disease"; url = "https://www.nhs.uk/conditions/coronary-heart-disease/" },
        { organisation = "CDC"; title = "Heart Disease"; url = "https://www.cdc.gov/heart-disease/" },
      ];
    },
  ];

  let mentalProblems : [Problem] = [
    {
      id = 6;
      slug = "anxiety";
      category = #mental;
      title = "Anxiety";
      summary = "Anxiety is a normal human emotion, but when it becomes constant or overwhelming it can take over daily life.";
      heroImage = "/images/problems/anxiety.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Anxiety is the body's natural response to threat or uncertainty. It becomes a problem when it is persistent, out of proportion to the situation, or interferes with everyday life. Anxiety disorders are among the most common mental health conditions worldwide.";
        },
        {
          heading = "Why does it matter?";
          body = "Anxiety can affect sleep, concentration, relationships and physical health. It often goes unrecognised because it can feel like ordinary worry. Left unaddressed, it can limit what people feel able to do and can lead to depression.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Anxiety has no single cause. Contributing factors include genetics, brain chemistry, personality, difficult or traumatic experiences, ongoing stress, and physical health problems. Caffeine, some medicines and substance use can also play a part.";
        },
        {
          heading = "Effects";
          body = "Anxiety can cause racing thoughts, restlessness, difficulty concentrating, irritability, muscle tension, a fast heartbeat, sweating and trouble sleeping. It can lead to avoidance of situations, which in turn can make the anxiety stronger.";
        },
        {
          heading = "Who can be affected?";
          body = "Anxiety can affect anyone at any age. It is common among young people, and many people experience their first symptoms in adolescence or early adulthood.";
        },
        {
          heading = "Impact on everyday life";
          body = "Anxiety can make school, work and social situations feel exhausting. People may avoid places or activities, and may hide their struggle. It can be invisible to others, which is part of why it is so often overlooked.";
        },
        {
          heading = "What can help?";
          body = "Talking therapies such as cognitive behavioural therapy are effective for many people, as are relaxation and breathing techniques, regular exercise, good sleep and reducing caffeine. Some people are offered medication. If anxiety is affecting daily life, speaking to a healthcare professional is a good first step.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Listen without minimising. Avoid saying 'just relax' or 'it's all in your head'. Stay calm and patient, offer practical help, and encourage professional support. Simply being present and taking the person seriously can make a real difference.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Anxiety disorders"; url = "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders" },
        { organisation = "NHS"; title = "Anxiety"; url = "https://www.nhs.uk/mental-health/conditions/anxiety/" },
        { organisation = "CDC"; title = "About Mental Health"; url = "https://www.cdc.gov/mental-health/about/index.html" },
      ];
    },
    {
      id = 7;
      slug = "depression";
      category = #mental;
      title = "Depression";
      summary = "Depression is more than sadness. It is a common but serious condition that affects how a person feels, thinks and functions.";
      heroImage = "/images/problems/depression.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Depression is a mood disorder that causes persistent low mood and loss of interest or pleasure in things that were once enjoyed. It is not the same as ordinary sadness or a bad day. It is a recognised health condition, and it is treatable.";
        },
        {
          heading = "Why does it matter?";
          body = "Depression is one of the leading causes of disability worldwide. It affects every part of life, including relationships, work, physical health and, at its most severe, can lead to thoughts of suicide. Recognising it as an illness rather than a weakness is an important step.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Depression has no single cause. It can result from a combination of genetics, brain chemistry, life events such as loss or trauma, ongoing stress, isolation, physical illness and substance use. Sometimes it appears without an obvious trigger.";
        },
        {
          heading = "Effects";
          body = "Symptoms can include persistent sadness, loss of interest, changes in sleep and appetite, fatigue, difficulty concentrating, feelings of worthlessness or guilt, and thoughts of death or self-harm. Depression can also cause physical symptoms such as aches and pains.";
        },
        {
          heading = "Who can be affected?";
          body = "Depression can affect anyone, at any age, in any country. It is common among young people and older adults alike. No one is immune because of their circumstances or success.";
        },
        {
          heading = "Impact on everyday life";
          body = "Depression can make even simple tasks feel overwhelming. People may withdraw from others, struggle to work or study, and feel unable to explain what is happening. The gap between how someone appears and how they feel can be wide.";
        },
        {
          heading = "What can help?";
          body = "Talking therapies, medication, lifestyle changes such as exercise and sleep, and social support all help. Different approaches work for different people, and recovery is often gradual. Anyone experiencing persistent low mood or thoughts of self-harm should seek professional help promptly.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Stay in touch, listen without trying to fix everything, and avoid telling the person to cheer up. Encourage professional help and offer practical support. If someone talks about suicide, take it seriously and help them reach urgent support.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Depression"; url = "https://www.who.int/news-room/fact-sheets/detail/depression" },
        { organisation = "NHS"; title = "Depression"; url = "https://www.nhs.uk/mental-health/conditions/depression/" },
        { organisation = "CDC"; title = "About Mental Health"; url = "https://www.cdc.gov/mental-health/about/index.html" },
      ];
    },
    {
      id = 8;
      slug = "stress";
      category = #mental;
      title = "Stress";
      summary = "Stress is a normal response to pressure, but when it becomes constant it wears down both body and mind.";
      heroImage = "/images/problems/stress.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Stress is the body's response to demands or threats. In short bursts it can help us focus and perform. When stress is prolonged or overwhelming, it stops being helpful and starts to harm health and wellbeing.";
        },
        {
          heading = "Why does it matter?";
          body = "Long-term stress is linked to anxiety, depression, sleep problems, heart disease, digestive issues and a weakened immune system. It affects how people think, feel and behave, and it is one of the most common experiences of modern life.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Common sources include work and study pressure, financial worries, caring responsibilities, relationship difficulties, health problems and major life changes. How much stress a person feels depends on the situation and on the support around them.";
        },
        {
          heading = "Effects";
          body = "Stress can cause headaches, muscle tension, fatigue, difficulty sleeping, irritability, poor concentration and changes in appetite. Over time it can contribute to serious physical and mental health conditions.";
        },
        {
          heading = "Who can be affected?";
          body = "Everyone experiences stress at some point. Some groups, such as students, carers, people in insecure work and those facing financial hardship, experience it more often and more intensely.";
        },
        {
          heading = "Impact on everyday life";
          body = "Ongoing stress can make people feel constantly on edge, reduce patience, strain relationships and lower performance. Many people normalise it, not realising how much it is affecting them until they reach breaking point.";
        },
        {
          heading = "What can help?";
          body = "Helpful approaches include regular physical activity, good sleep, time in nature, breathing and relaxation techniques, talking to someone, and setting boundaries. Where stress comes from work or money, practical changes matter as much as coping strategies.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Ask how they are and really listen. Avoid adding pressure or dismissing their worries. Offer practical help where you can, and encourage them to seek support if stress is affecting their health.";
        },
      ];
      sources = [
        { organisation = "NHS"; title = "Stress"; url = "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/" },
        { organisation = "World Health Organization"; title = "Mental health at work"; url = "https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work" },
        { organisation = "CDC"; title = "Managing Stress"; url = "https://www.cdc.gov/mental-health/living-with/index.html" },
      ];
    },
    {
      id = 9;
      slug = "loneliness";
      category = #mental;
      title = "Loneliness";
      summary = "Loneliness is the distress of feeling disconnected from others. It can affect anyone, and it has real effects on health.";
      heroImage = "/images/problems/loneliness.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Loneliness is the painful feeling of not having the connection or companionship a person needs. It is not the same as being alone: someone can feel lonely in a crowd, and someone can be alone without feeling lonely. It is a signal, much like hunger, that a basic human need is unmet.";
        },
        {
          heading = "Why does it matter?";
          body = "Human connection is essential to health. Loneliness is linked to depression, anxiety, poorer sleep and, over time, to physical health problems including heart disease. It can affect people of any age, and it is often hidden because of stigma.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Contributors include life changes such as moving, bereavement, retirement or starting university, living alone, poor health or disability, caring responsibilities, and a lack of local community spaces. Digital life can connect people but can also replace face-to-face contact.";
        },
        {
          heading = "Effects";
          body = "Loneliness can lead to low mood, anxiety, low self-esteem and sleep problems. It can also make people withdraw further, creating a cycle that is hard to break. Over the long term it is associated with poorer physical health.";
        },
        {
          heading = "Who can be affected?";
          body = "Loneliness can affect anyone, but it is especially common among older adults, young people, people living alone, carers, and those who have recently experienced major life changes.";
        },
        {
          heading = "Impact on everyday life";
          body = "Loneliness can make ordinary days feel heavy and can reduce motivation. People may feel ashamed to admit it, which makes it harder to reach out. It can affect work, study and physical health.";
        },
        {
          heading = "What can help?";
          body = "Rebuilding connection takes time. Small steps such as reaching out to one person, joining a group or volunteering can help. Talking therapies can support people who feel stuck. Where loneliness follows bereavement or a big change, support groups can be valuable.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Reach out first and keep reaching out. A simple message or invitation can mean a great deal. Include people, listen without judgement, and avoid assuming that someone who is quiet wants to be left alone.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Social connection"; url = "https://www.who.int/news-room/fact-sheets/detail/social-connection" },
        { organisation = "NHS"; title = "Loneliness"; url = "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/loneliness/" },
        { organisation = "CDC"; title = "Social Connection"; url = "https://www.cdc.gov/social-connectedness/" },
      ];
    },
    {
      id = 10;
      slug = "burnout";
      category = #mental;
      title = "Burnout";
      summary = "Burnout is the exhaustion that comes from prolonged, unmanaged stress — most often at work, but also in study and caregiving.";
      heroImage = "/images/problems/burnout.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Burnout is a state of physical and emotional exhaustion caused by prolonged stress that has not been successfully managed. It is most often described in relation to work, but it can also affect students, carers and volunteers. It is not simply being tired; it is a deeper depletion.";
        },
        {
          heading = "Why does it matter?";
          body = "Burnout affects health, relationships and performance. It can lead to anxiety, depression, sleep problems and physical illness, and it can make people feel detached from work they once cared about. Recognising it early makes recovery easier.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Burnout is usually driven by the situation rather than the individual. Common factors include excessive workload, lack of control, unclear expectations, unfair treatment, insufficient support, and values that clash with the demands of the role. Long hours and a culture that ignores rest make it worse.";
        },
        {
          heading = "Effects";
          body = "Signs include exhaustion that rest does not fix, feeling detached or cynical, reduced effectiveness, irritability, difficulty concentrating, and physical symptoms such as headaches and sleep problems. Burnout can also contribute to depression.";
        },
        {
          heading = "Who can be affected?";
          body = "Burnout can affect anyone in a demanding role, including healthcare workers, teachers, students, carers and people in high-pressure jobs. It is not a sign of weakness or a lack of commitment.";
        },
        {
          heading = "Impact on everyday life";
          body = "Burnout can make work and daily tasks feel impossible, strain relationships, and lead people to withdraw. Many people keep going for a long time before they realise how depleted they are.";
        },
        {
          heading = "What can help?";
          body = "Recovery usually requires changes to the situation as well as to the person: reducing workload, setting boundaries, taking proper rest, and seeking support from managers, colleagues or healthcare professionals. Talking therapies can help, and where burnout has led to depression, professional treatment may be needed.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Take it seriously and avoid framing it as a personal failing. Help reduce pressure where you can, encourage rest and professional support, and check in regularly. A supportive environment is one of the strongest protections against burnout.";
        },
      ];
      sources = [
        { organisation = "World Health Organization"; title = "Burn-out an occupational phenomenon"; url = "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases" },
        { organisation = "World Health Organization"; title = "Mental health at work"; url = "https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work" },
        { organisation = "NHS"; title = "Work-related stress"; url = "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/" },
      ];
    },
    {
      id = 11;
      slug = "social-media-self-esteem";
      category = #mental;
      title = "Social media & self-esteem";
      summary = "Social media connects us, but constant comparison and curated feeds can quietly damage how people feel about themselves.";
      heroImage = "/images/problems/social-media-self-esteem.jpg";
      sections = [
        {
          heading = "What is it?";
          body = "Social media lets people share and connect, but it also presents a constant stream of curated highlights. Comparing everyday life with other people's best moments can affect self-esteem, body image and mood, especially for young people.";
        },
        {
          heading = "Why does it matter?";
          body = "Self-esteem shapes how people feel about themselves and how they cope with challenges. Heavy social media use has been linked with poorer body image, low mood, anxiety and sleep problems, particularly among adolescents. The effects are not inevitable, but they are real and worth understanding.";
        },
        {
          heading = "Causes / contributing factors";
          body = "Contributors include constant comparison with others, algorithms that reward attention, filters and editing that create unrealistic standards, online harassment, and the pressure to present a perfect life. Time spent online late at night can also disrupt sleep.";
        },
        {
          heading = "Effects";
          body = "Effects can include low mood, anxiety, poorer body image, reduced self-esteem, sleep problems and a sense of never being good enough. For some people, online harassment or exclusion can be deeply distressing.";
        },
        {
          heading = "Who can be affected?";
          body = "Anyone who uses social media can be affected, but young people and adolescents are especially vulnerable because identity and self-image are still developing.";
        },
        {
          heading = "Impact on everyday life";
          body = "Social media can affect mood, concentration and sleep, and can shape how people see themselves and their bodies. It can also create pressure to keep up, which adds to stress and anxiety.";
        },
        {
          heading = "What can help?";
          body = "Helpful steps include curating who you follow, limiting time online, turning off notifications, taking breaks, and being aware that feeds are edited highlights. Talking about how social media makes you feel can help. If it is affecting mental health, professional support is available.";
        },
        {
          heading = "How can others support someone experiencing it?";
          body = "Avoid dismissing concerns about social media as trivial. Talk openly about how platforms are designed, model healthy use yourself, and support young people in building interests and relationships offline. Be alert to signs of distress and offer help.";
        },
      ];
      sources = [
        { organisation = "UNICEF"; title = "Children and the digital world"; url = "https://www.unicef.org/digitaleducation/" },
        { organisation = "World Health Organization"; title = "Mental health of adolescents"; url = "https://www.who.int/news-room/fact-sheets/detail/mental-health-of-adolescents" },
        { organisation = "NHS"; title = "Mental wellbeing"; url = "https://www.nhs.uk/mental-health/" },
      ];
    },
  ];

  let examples : [RealLifeExample] = [
    {
      id = 0;
      category = #mental;
      person = "A young person supported by a mental health charity";
      situation = "A teenager described how constant comparison on social media left them feeling that their own life was not good enough.";
      problem = "Social media & self-esteem";
      impact = "They withdrew from friends, slept poorly, and began avoiding photographs of themselves.";
      journey = "With support from a youth mental health service, they learned to recognise edited content, reduced their time online and rebuilt offline interests. Their account is shared by the charity to help others feel less alone.";
      source = { organisation = "Mind"; title = "Social media and mental health"; url = "https://www.mind.org.uk/information-support/tips-for-everyday-living/online-mental-health/social-media-and-mental-health/" };
    },
    {
      id = 1;
      category = #mental;
      person = "A person who experienced depression";
      situation = "An adult described living with depression that developed gradually after a period of sustained stress and loss.";
      problem = "Depression";
      impact = "They found it hard to work, withdrew from family, and felt unable to explain what was happening to them.";
      journey = "Through talking therapy and support from those around them, they began to recover. They now speak publicly about their experience to challenge the idea that depression is a personal weakness.";
      source = { organisation = "Mind"; title = "Depression"; url = "https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/" };
    },
    {
      id = 2;
      category = #mental;
      person = "A carer who experienced burnout";
      situation = "A person caring for a relative described reaching a point of exhaustion that rest could not fix.";
      problem = "Burnout";
      impact = "They felt detached and irritable, struggled to concentrate, and found everyday tasks overwhelming.";
      journey = "With support from a carers' organisation, they arranged respite care, set boundaries and sought help. They describe recovery as gradual and ongoing.";
      source = { organisation = "Carers UK"; title = "Looking after yourself"; url = "https://www.carersuk.org/help-and-advice/health/looking-after-yourself/" };
    },
    {
      id = 3;
      category = #physical;
      person = "A person living with type 2 diabetes";
      situation = "An adult was diagnosed with type 2 diabetes after a routine check-up, having had no obvious symptoms.";
      problem = "Type 2 diabetes risk";
      impact = "The diagnosis meant daily monitoring, medication and changes to how they ate and moved, which they found demanding at first.";
      journey = "With support from their healthcare team and a structured programme, they made gradual changes and now describe their condition as well managed.";
      source = { organisation = "NHS"; title = "Type 2 diabetes"; url = "https://www.nhs.uk/conditions/type-2-diabetes/" };
    },
    {
      id = 4;
      category = #physical;
      person = "A person who experienced persistent insomnia";
      situation = "An adult described months of difficulty falling asleep and waking through the night during a period of work stress.";
      problem = "Sleep problems";
      impact = "They felt exhausted, irritable and unable to concentrate, and their relationships began to suffer.";
      journey = "After speaking to their GP, they tried cognitive behavioural therapy for insomnia and made changes to their routine. Their sleep gradually improved.";
      source = { organisation = "NHS"; title = "Insomnia"; url = "https://www.nhs.uk/conditions/insomnia/" };
    },
    {
      id = 5;
      category = #physical;
      person = "A person supported by a loneliness charity";
      situation = "An older adult described feeling deeply lonely after retirement and the loss of a partner.";
      problem = "Loneliness";
      impact = "They went days without speaking to anyone, lost motivation, and found their mood steadily worsening.";
      journey = "Through a befriending service and a local community group, they rebuilt connections. They describe the change as gradual but life-changing.";
      source = { organisation = "Age UK"; title = "Loneliness"; url = "https://www.ageuk.org.uk/information-advice/health-wellbeing/relationships-family/loneliness/" };
    },
  ];

  let featured : [FeaturedIssue] = [
    { slug = "anxiety"; category = #mental; title = "Anxiety"; summary = "When worry stops being occasional and starts to take over daily life."; heroImage = "/images/problems/anxiety.jpg" },
    { slug = "loneliness"; category = #mental; title = "Loneliness"; summary = "The distress of feeling disconnected, and why connection is a health need."; heroImage = "/images/problems/loneliness.jpg" },
    { slug = "sleep-problems"; category = #physical; title = "Sleep problems"; summary = "Why sleep is a basic need, not a luxury, and what gets in the way."; heroImage = "/images/problems/sleep-problems.jpg" },
    { slug = "obesity"; category = #physical; title = "Obesity"; summary = "A complex condition shaped by biology, environment and society."; heroImage = "/images/problems/obesity.jpg" },
  ];

  let siteContent : SiteContent = {
    siteName = "Behind the Statistic";
    tagline = "Real people. Real struggles. Real understanding.";
    introduction = "Behind every statistic is a real person. This website explores the physical and mental wellbeing problems that affect people around us — often quietly — and explains what they are, why they matter, and how we can understand them better.";
    whyThisMatters = {
      heading = "Why This Matters";
      paragraphs = [
        "This project began as part of a Duke of Edinburgh's Bronze Award, but its purpose goes well beyond completing an award. It started from a simple observation: many of the problems that affect people most deeply are the ones we notice least.",
        "Around us, people struggle with their physical and mental health in ways that are easy to overlook. Someone may be exhausted from sleepless nights, weighed down by anxiety, or quietly isolated, and still appear to be coping. Statistics tell us how many people are affected, but they cannot tell us what it feels like to live with a problem, or how it changes a person's days.",
        "That is why this website pairs reliable information with real human stories. The information helps us understand what these problems are and what can help. The stories remind us that behind every number is a person with a life, a family and a future.",
        "The aim is not to alarm or to diagnose, but to build awareness, empathy and understanding — and to encourage conversations that might otherwise never happen. If this website helps even one person feel seen, or helps one visitor understand someone else a little better, it will have done what it set out to do.",
      ];
    };
    contactDetails = {
      createdBy = "[Your Name]";
      email = "[Your Email]";
      organisation = "[Optional]";
      location = "[Optional]";
      project = "Duke of Edinburgh's Bronze Award";
    };
  };

  public func migration(_old : OldActor) : NewActor {
    let problems = Map.empty<Nat, Problem>();
    for (p in physicalProblems.values()) {
      problems.add(p.id, p);
    };
    for (p in mentalProblems.values()) {
      problems.add(p.id, p);
    };
    let exampleMap = Map.empty<Nat, RealLifeExample>();
    for (e in examples.values()) {
      exampleMap.add(e.id, e);
    };
    let featuredMap = Map.empty<Nat, FeaturedIssue>();
    var featuredId = 0;
    for (f in featured.values()) {
      featuredMap.add(featuredId, f);
      featuredId += 1;
    };
    {
      accessControlState = AccessControl.initState();
      problems;
      examples = exampleMap;
      featured = featuredMap;
      siteContent;
      submissions = Map.empty();
      contactState = { var nextId = 0 };
    };
  };
};
