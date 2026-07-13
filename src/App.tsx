// @ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from './supabase';

const C = {
  bg:'#0d0b1e',card:'rgba(255,255,255,0.045)',border:'rgba(201,168,76,0.28)',
  gold:'#c9a84c',goldL:'#f0d060',cream:'#f0e0c0',text:'#dcc9a8',dim:'#7a6a50',
};
const TABS = [
  {id:'dashboard',icon:'⚡',label:'Great Hall'},
  {id:'routine',icon:'🕯️',label:'Daily Spells'},
  {id:'health',icon:'🧪',label:'Potions'},
  {id:'sleep',icon:'🌙',label:'Dormitory'},
  {id:'hobby',icon:'🎨',label:'Free Period'},
  {id:'notes',icon:'📜',label:'Journal'},
  {id:'mood',icon:'🔮',label:'Divination'},
  {id:'goals',icon:'🎯',label:'Goals'},
  {id:'pomodoro',icon:'⏳',label:'Focus'},
  {id:'analytics',icon:'✨',label:'Progress'},
];
const QUOTES = [
  // ⚡ Harry Potter
  {q:"It does not do to dwell on dreams and forget to live.",a:"Dumbledore"},
  {q:"Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",a:"Dumbledore"},
  {q:"It is our choices that show what we truly are, far more than our abilities.",a:"Dumbledore"},
  {q:"We've all got both light and dark inside us. What matters is the part we choose to act on.",a:"Sirius Black"},
  {q:"The ones that love us never really leave us.",a:"Sirius Black"},
  {q:"Working hard is important, but there's something that matters even more — believing in yourself.",a:"Harry Potter"},
  {q:"Fear of a name only increases fear of the thing itself.",a:"Hermione Granger"},
  {q:"When in doubt, go to the library.",a:"Hermione Granger"},
  {q:"Every great wizard started out as nothing more than what we are now.",a:"Harry Potter"},
  {q:"Things we lose have a way of coming back to us in the end.",a:"Luna Lovegood"},
  {q:"You sort of start thinking anything's possible if you've got enough nerve.",a:"Ginny Weasley"},
  {q:"Words are our most inexhaustible source of magic.",a:"Dumbledore"},
  {q:"It takes a great deal of bravery to stand up to our enemies, but more to stand up to our friends.",a:"Dumbledore"},
  {q:"We are only as strong as we are united, as weak as we are divided.",a:"Dumbledore"},
  {q:"Do not pity the dead. Pity the living, and those who live without love.",a:"Dumbledore"},
  {q:"I am what I am, an' I'm not ashamed.",a:"Hagrid"},
  {q:"I solemnly swear that I am up to no good.",a:"The Marauders"},
  {q:"Mischief managed.",a:"The Marauders"},
  // 🌟 Motivation & Life
  {q:"The secret of getting ahead is getting started.",a:"Mark Twain"},
  {q:"It always seems impossible until it's done.",a:"Nelson Mandela"},
  {q:"You miss 100% of the shots you don't take.",a:"Wayne Gretzky"},
  {q:"Whether you think you can or you think you can't — you're right.",a:"Henry Ford"},
  {q:"The only way to do great work is to love what you do.",a:"Steve Jobs"},
  {q:"In the middle of every difficulty lies opportunity.",a:"Albert Einstein"},
  {q:"Life is what happens when you're busy making other plans.",a:"John Lennon"},
  {q:"The future belongs to those who believe in the beauty of their dreams.",a:"Eleanor Roosevelt"},
  {q:"It is during our darkest moments that we must focus to see the light.",a:"Aristotle"},
  {q:"Spread love everywhere you go. Let no one ever come to you without leaving happier.",a:"Mother Teresa"},
  {q:"When you reach the end of your rope, tie a knot in it and hang on.",a:"Franklin D. Roosevelt"},
  {q:"Don't judge each day by the harvest you reap but by the seeds that you plant.",a:"Robert Louis Stevenson"},
  {q:"You only live once, but if you do it right, once is enough.",a:"Mae West"},
  {q:"Be yourself; everyone else is already taken.",a:"Oscar Wilde"},
  {q:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",a:"Albert Einstein"},
  {q:"A room without books is like a body without a soul.",a:"Marcus Tullius Cicero"},
  {q:"You've gotta dance like there's nobody watching.",a:"William W. Purkey"},
  {q:"We accept the love we think we deserve.",a:"Stephen Chbosky"},
  {q:"Darkness cannot drive out darkness; only light can do that.",a:"Martin Luther King Jr."},
  {q:"The most common way people give up their power is by thinking they don't have any.",a:"Alice Walker"},
  {q:"Believe you can and you're halfway there.",a:"Theodore Roosevelt"},
  {q:"Success is not final, failure is not fatal — it is the courage to continue that counts.",a:"Winston Churchill"},
  {q:"You must be the change you wish to see in the world.",a:"Mahatma Gandhi"},
  {q:"In three words I can sum up everything I've learned about life: it goes on.",a:"Robert Frost"},
  {q:"If you tell the truth, you don't have to remember anything.",a:"Mark Twain"},
  {q:"To live is the rarest thing in the world. Most people exist, that is all.",a:"Oscar Wilde"},
  {q:"No one can make you feel inferior without your consent.",a:"Eleanor Roosevelt"},
  {q:"I've learned that people will forget what you said, but never how you made them feel.",a:"Maya Angelou"},
  {q:"If life were predictable it would cease to be life, and be without flavor.",a:"Eleanor Roosevelt"},
  {q:"If you look at what you have in life, you'll always have more.",a:"Oprah Winfrey"},
  {q:"If you want to live a happy life, tie it to a goal, not to people or things.",a:"Albert Einstein"},
  {q:"Never let the fear of striking out keep you from playing the game.",a:"Babe Ruth"},
  {q:"Money and success don't change people; they merely amplify what is already there.",a:"Will Smith"},
  {q:"Your time is limited, so don't waste it living someone else's life.",a:"Steve Jobs"},
  {q:"Not how long, but how well you have lived is the main thing.",a:"Seneca"},
  {q:"If you're not stubborn, you'll give up on experiments too soon.",a:"Jeff Bezos"},
  {q:"Dream big and dare to fail.",a:"Norman Vaughan"},
  {q:"You become what you believe.",a:"Oprah Winfrey"},
  {q:"The best time to plant a tree was 20 years ago. The second best time is now.",a:"Chinese Proverb"},
  {q:"An unexamined life is not worth living.",a:"Socrates"},
  {q:"Spread your wings and let the fairy in you fly.",a:"Anonymous"},
  {q:"Small steps every day lead to big magic over time.",a:"Anonymous"},
  {q:"The magic you're looking for is in the work you're avoiding.",a:"Anonymous"},
  {q:"You didn't come this far to only come this far.",a:"Anonymous"},
  {q:"Not all those who wander are lost — but today, wander with purpose.",a:"Anonymous"},
  {q:"Start where you are. Use what you have. Do what you can.",a:"Arthur Ashe"},
  {q:"Act as if what you do makes a difference. It does.",a:"William James"},
  {q:"What lies behind us and what lies before us are tiny matters compared to what lies within us.",a:"Ralph Waldo Emerson"},
  // More HP
  {q:"Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?",a:"Dumbledore"},
  {q:"Do not pity the dead, Harry. Pity the living, and above all, those who live without love.",a:"Dumbledore"},
  {q:"You are the true master of death, because the true master does not seek to run away from Death.",a:"Dumbledore"},
  {q:"Numbing the pain for a while will make it worse when you finally feel it.",a:"Dumbledore"},
  {q:"It is a curious thing, Harry, but perhaps those who are best suited to power are those who have never sought it.",a:"Dumbledore"},
  {q:"Where your treasure is, there will your heart be also.",a:"Dumbledore"},
  {q:"Just because you have the emotional range of a teaspoon doesn't mean we all have.",a:"Hermione Granger"},
  {q:"I'm going to bed before either of you come up with another clever idea to get us killed.",a:"Hermione Granger"},
  {q:"I mean, it's sort of exciting, isn't it? Breaking the rules.",a:"Hermione Granger"},
  {q:"We could all have been killed — or worse, expelled.",a:"Hermione Granger"},
  {q:"Honestly, am I the only person who's ever bothered to read Hogwarts: A History?",a:"Hermione Granger"},
  {q:"The truth is a beautiful and terrible thing, and should therefore be treated with great caution.",a:"Dumbledore"},
  {q:"You fail to recognize that it matters not what someone is born, but what they grow to be.",a:"Dumbledore"},
  {q:"Differences of habit and language are nothing at all if our aims are identical.",a:"Dumbledore"},
  {q:"Do not be seduced by the Dark Side… I mean, stay curious and keep learning.",a:"Anonymous"},
  // More motivation
  {q:"You don't have to be great to start, but you have to start to be great.",a:"Zig Ziglar"},
  {q:"The only person you are destined to become is the person you decide to be.",a:"Ralph Waldo Emerson"},
  {q:"Go confidently in the direction of your dreams. Live the life you have imagined.",a:"Henry David Thoreau"},
  {q:"Challenges are what make life interesting. Overcoming them is what makes life meaningful.",a:"Joshua J. Marine"},
  {q:"You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",a:"Dr. Seuss"},
  {q:"It does not matter how slowly you go as long as you do not stop.",a:"Confucius"},
  {q:"Everything you've ever wanted is on the other side of fear.",a:"George Addair"},
  {q:"Hardships often prepare ordinary people for an extraordinary destiny.",a:"C.S. Lewis"},
  {q:"The best way to predict the future is to create it.",a:"Abraham Lincoln"},
  {q:"You are never too old to set another goal or to dream a new dream.",a:"C.S. Lewis"},
  {q:"Keep your face always toward the sunshine, and shadows will fall behind you.",a:"Walt Whitman"},
  {q:"Try to be a rainbow in someone's cloud.",a:"Maya Angelou"},
  {q:"Nothing is impossible. The word itself says 'I'm possible'.",a:"Audrey Hepburn"},
  {q:"I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",a:"Jimmy Dean"},
  {q:"Believe in yourself and all that you are.",a:"Christian D. Larson"},
  {q:"Too many of us are not living our dreams because we are living our fears.",a:"Les Brown"},
  {q:"Small daily improvements over time lead to stunning results.",a:"Robin Sharma"},
  {q:"Your limitation — it's only your imagination.",a:"Anonymous"},
  {q:"Push yourself, because no one else is going to do it for you.",a:"Anonymous"},
  {q:"Great things never come from comfort zones.",a:"Anonymous"},
  {q:"Dream it. Wish it. Do it.",a:"Anonymous"},
  {q:"Success doesn't just find you. You have to go out and get it.",a:"Anonymous"},
  {q:"The harder you work for something, the greater you'll feel when you achieve it.",a:"Anonymous"},
  {q:"Don't stop when you're tired. Stop when you're done.",a:"Anonymous"},
  {q:"Wake up with determination. Go to bed with satisfaction.",a:"Anonymous"},
  // Marcus Aurelius / Stoics
  {q:"You have power over your mind, not outside events. Realize this, and you will find strength.",a:"Marcus Aurelius"},
  {q:"The impediment to action advances action. What stands in the way becomes the way.",a:"Marcus Aurelius"},
  {q:"Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",a:"Marcus Aurelius"},
  {q:"Waste no more time arguing what a good man should be. Be one.",a:"Marcus Aurelius"},
  {q:"Accept the things to which fate binds you, and love the people with whom fate brings you together.",a:"Marcus Aurelius"},
  {q:"If it is not right, do not do it; if it is not true, do not say it.",a:"Marcus Aurelius"},
  {q:"The best revenge is to be unlike him who performed the injury.",a:"Marcus Aurelius"},
  {q:"How much more grievous are the consequences of anger than the causes of it.",a:"Marcus Aurelius"},
  {q:"Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",a:"Marcus Aurelius"},
  {q:"Dwell on the beauty of life. Watch the stars, and see yourself running with them.",a:"Marcus Aurelius"},
  {q:"It is not death that a man should fear, but he should fear never beginning to live.",a:"Marcus Aurelius"},
  {q:"The soul becomes dyed with the colour of its thoughts.",a:"Marcus Aurelius"},
  {q:"You could leave life right now. Let that determine what you do and say and think.",a:"Marcus Aurelius"},
  {q:"Confine yourself to the present.",a:"Marcus Aurelius"},
  {q:"He who lives in harmony with himself lives in harmony with the universe.",a:"Marcus Aurelius"},
  {q:"It never ceases to amaze me: we all love ourselves more than other people, but care more about their opinion than our own.",a:"Marcus Aurelius"},
  // Seneca
  {q:"Luck is what happens when preparation meets opportunity.",a:"Seneca"},
  {q:"We suffer more often in imagination than in reality.",a:"Seneca"},
  {q:"Begin at once to live, and count each separate day as a separate life.",a:"Seneca"},
  {q:"Wildness is not optional for humans, it's essential.",a:"Seneca"},
  {q:"Difficulties strengthen the mind, as labour does the body.",a:"Seneca"},
  {q:"He who is brave is free.",a:"Seneca"},
  {q:"No man was ever wise by chance.",a:"Seneca"},
  {q:"The mind that is anxious about future events is miserable.",a:"Seneca"},
  {q:"Associate with people who are likely to improve you.",a:"Seneca"},
  {q:"If you wish to be loved, love.",a:"Seneca"},
  // Tolkien
  {q:"Even the smallest person can change the course of the future.",a:"Galadriel – LOTR"},
  {q:"All we have to decide is what to do with the time that is given us.",a:"Gandalf – LOTR"},
  {q:"Not all those who wander are lost.",a:"J.R.R. Tolkien"},
  {q:"It's a dangerous business, Frodo, going out your door.",a:"Bilbo Baggins – LOTR"},
  {q:"I wish it need not have happened in my time.",a:"Frodo – LOTR"},
  {q:"So do all who live to see such times. But that is not for them to decide.",a:"Gandalf – LOTR"},
  {q:"Courage is found in unlikely places.",a:"J.R.R. Tolkien"},
  {q:"A single dream is more powerful than a thousand realities.",a:"J.R.R. Tolkien"},
  {q:"There is some good in this world, and it's worth fighting for.",a:"Samwise Gamgee – LOTR"},
  {q:"Even darkness must pass. A new day will come.",a:"Samwise Gamgee – LOTR"},
  {q:"I am looking for someone to share in an adventure.",a:"Gandalf – The Hobbit"},
  {q:"If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.",a:"Thorin – The Hobbit"},
  // Shakespeare
  {q:"This above all: to thine own self be true.",a:"Shakespeare"},
  {q:"We know what we are, but know not what we may be.",a:"Shakespeare"},
  {q:"Our doubts are traitors, and make us lose the good we oft might win, by fearing to attempt.",a:"Shakespeare"},
  {q:"What's in a name? That which we call a rose by any other name would smell as sweet.",a:"Shakespeare"},
  {q:"The course of true love never did run smooth.",a:"Shakespeare"},
  {q:"All the world's a stage, and all the men and women merely players.",a:"Shakespeare"},
  {q:"We are such stuff as dreams are made on.",a:"Shakespeare"},
  {q:"Expectation is the root of all heartache.",a:"Shakespeare"},
  {q:"It is not in the stars to hold our destiny but in ourselves.",a:"Shakespeare"},
  {q:"Love all, trust a few, do wrong to none.",a:"Shakespeare"},
  // Einstein / Scientists
  {q:"Imagination is more important than knowledge.",a:"Albert Einstein"},
  {q:"A person who never made a mistake never tried anything new.",a:"Albert Einstein"},
  {q:"Logic will get you from A to B. Imagination will take you everywhere.",a:"Albert Einstein"},
  {q:"Life is like riding a bicycle. To keep your balance, you must keep moving.",a:"Albert Einstein"},
  {q:"Try not to become a man of success, but rather try to become a man of value.",a:"Albert Einstein"},
  {q:"The important thing is not to stop questioning. Curiosity has its own reason for existing.",a:"Albert Einstein"},
  {q:"I have no special talent. I am only passionately curious.",a:"Albert Einstein"},
  {q:"Nothing happens until something moves.",a:"Albert Einstein"},
  {q:"We cannot solve our problems with the same thinking we used when we created them.",a:"Albert Einstein"},
  {q:"The measure of intelligence is the ability to change.",a:"Albert Einstein"},
  {q:"I am enough of an artist to draw freely upon my imagination.",a:"Albert Einstein"},
  {q:"Look deep into nature, and then you will understand everything better.",a:"Albert Einstein"},
  {q:"Nothing in life is to be feared, only to be understood.",a:"Marie Curie"},
  {q:"Be less curious about people and more curious about ideas.",a:"Marie Curie"},
  {q:"I was taught that the way of progress was neither swift nor easy.",a:"Marie Curie"},
  // Aristotle / Plato
  {q:"We are what we repeatedly do. Excellence, then, is not an act, but a habit.",a:"Aristotle"},
  {q:"Knowing yourself is the beginning of all wisdom.",a:"Aristotle"},
  {q:"The more you know, the more you realize you don't know.",a:"Aristotle"},
  {q:"Happiness depends upon ourselves.",a:"Aristotle"},
  {q:"The whole is more than the sum of its parts.",a:"Aristotle"},
  {q:"Quality is not an act, it is a habit.",a:"Aristotle"},
  {q:"At his best, man is the noblest of all animals; separated from law and justice he is the worst.",a:"Aristotle"},
  {q:"Educating the mind without educating the heart is no education at all.",a:"Aristotle"},
  {q:"The energy of the mind is the essence of life.",a:"Aristotle"},
  {q:"Excellence is never an accident.",a:"Aristotle"},
  {q:"The secret to humor is surprise.",a:"Aristotle"},
  {q:"One swallow does not make a summer.",a:"Aristotle"},
  // C.S. Lewis
  {q:"You are never too old to set another goal or to dream a new dream.",a:"C.S. Lewis"},
  {q:"Friendship is born at the moment when one person says to another: What! You too? I thought I was the only one.",a:"C.S. Lewis"},
  {q:"You can't go back and change the beginning, but you can start where you are and change the ending.",a:"C.S. Lewis"},
  {q:"Courage is not simply one of the virtues, but the form of every virtue at the testing point.",a:"C.S. Lewis"},
  {q:"Failures are finger posts on the road to achievement.",a:"C.S. Lewis"},
  {q:"The future is something which everyone reaches at the rate of sixty minutes an hour.",a:"C.S. Lewis"},
  {q:"There are far, far better things ahead than any we leave behind.",a:"C.S. Lewis"},
  {q:"Integrity is doing the right thing, even when no one is watching.",a:"C.S. Lewis"},
  // Business / Modern
  {q:"Stay hungry, stay foolish.",a:"Steve Jobs"},
  {q:"Innovation distinguishes between a leader and a follower.",a:"Steve Jobs"},
  {q:"The people who are crazy enough to think they can change the world are the ones who do.",a:"Steve Jobs"},
  {q:"Design is not just what it looks like. Design is how it works.",a:"Steve Jobs"},
  {q:"Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",a:"Mark Zuckerberg"},
  {q:"The biggest risk is not taking any risk.",a:"Mark Zuckerberg"},
  {q:"Done is better than perfect.",a:"Sheryl Sandberg"},
  {q:"In the middle of difficulty lies opportunity.",a:"Albert Einstein"},
  {q:"It always seems impossible until it's done.",a:"Nelson Mandela"},
  {q:"Education is the most powerful weapon which you can use to change the world.",a:"Nelson Mandela"},
  {q:"I never lose. I either win or learn.",a:"Nelson Mandela"},
  {q:"Do not judge me by my successes, judge me by how many times I fell down and got back up again.",a:"Nelson Mandela"},
  {q:"Success is not final; failure is not fatal: it is the courage to continue that counts.",a:"Winston Churchill"},
  {q:"To improve is to change; to be perfect is to change often.",a:"Winston Churchill"},
  {q:"Attitude is a little thing that makes a big difference.",a:"Winston Churchill"},
  {q:"Without data, you're just another person with an opinion.",a:"W. Edwards Deming"},
  {q:"An investment in knowledge pays the best interest.",a:"Benjamin Franklin"},
  {q:"Well done is better than well said.",a:"Benjamin Franklin"},
  {q:"By failing to prepare, you are preparing to fail.",a:"Benjamin Franklin"},
  {q:"Energy and persistence conquer all things.",a:"Benjamin Franklin"},
  {q:"Tell me and I forget. Teach me and I remember. Involve me and I learn.",a:"Benjamin Franklin"},
  {q:"Either write something worth reading or do something worth writing.",a:"Benjamin Franklin"},
  // Oprah / Maya Angelou
  {q:"The biggest adventure you can take is to live the life of your dreams.",a:"Oprah Winfrey"},
  {q:"Turn your wounds into wisdom.",a:"Oprah Winfrey"},
  {q:"You get in life what you have the courage to ask for.",a:"Oprah Winfrey"},
  {q:"Real integrity is doing the right thing, knowing that nobody's going to know whether you did it or not.",a:"Oprah Winfrey"},
  {q:"Nothing will work unless you do.",a:"Maya Angelou"},
  {q:"You can't use up creativity. The more you use, the more you have.",a:"Maya Angelou"},
  {q:"If you don't like something, change it. If you can't change it, change your attitude.",a:"Maya Angelou"},
  {q:"My mission in life is not merely to survive, but to thrive.",a:"Maya Angelou"},
  {q:"I've learned that making a living is not the same thing as making a life.",a:"Maya Angelou"},
  {q:"A wise woman wishes to be no one's enemy; a wise woman refuses to be anyone's victim.",a:"Maya Angelou"},
  // Buddha / Philosophy
  {q:"The mind is everything. What you think you become.",a:"Buddha"},
  {q:"Three things cannot be long hidden: the sun, the moon, and the truth.",a:"Buddha"},
  {q:"Peace comes from within. Do not seek it without.",a:"Buddha"},
  {q:"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",a:"Buddha"},
  {q:"In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.",a:"Buddha"},
  {q:"You yourself, as much as anybody in the entire universe, deserve your love and affection.",a:"Buddha"},
  {q:"If you light a lamp for somebody, it will also brighten your path.",a:"Buddha"},
  {q:"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",a:"Buddha"},
  {q:"It is better to travel well than to arrive.",a:"Buddha"},
  {q:"What you think, you become. What you feel, you attract. What you imagine, you create.",a:"Buddha"},
  // Misc great minds
  {q:"The only way to do great work is to love what you do.",a:"Steve Jobs"},
  {q:"Strive not to be a success, but rather to be of value.",a:"Albert Einstein"},
  {q:"I find that the harder I work, the more luck I seem to have.",a:"Thomas Jefferson"},
  {q:"Don't watch the clock; do what it does. Keep going.",a:"Sam Levenson"},
  {q:"Keep your eyes on the stars and your feet on the ground.",a:"Theodore Roosevelt"},
  {q:"Believe you can and you're halfway there.",a:"Theodore Roosevelt"},
  {q:"Do what you can, with what you have, where you are.",a:"Theodore Roosevelt"},
  {q:"It is not the mountain we conquer but ourselves.",a:"Edmund Hillary"},
  {q:"A journey of a thousand miles begins with a single step.",a:"Lao Tzu"},
  {q:"When you realize nothing is lacking, the whole world belongs to you.",a:"Lao Tzu"},
  {q:"Life is really simple, but we insist on making it complicated.",a:"Confucius"},
  {q:"The man who moves a mountain begins by carrying away small stones.",a:"Confucius"},
  {q:"Choose a job you love, and you will never have to work a day in your life.",a:"Confucius"},
  {q:"To know what you know and what you do not know, that is true knowledge.",a:"Confucius"},
  {q:"The gem cannot be polished without friction, nor man perfected without trials.",a:"Confucius"},
  {q:"Real knowledge is to know the extent of one's ignorance.",a:"Confucius"},
  {q:"Wherever you go, go with all your heart.",a:"Confucius"},
  {q:"Attack the evil that is within yourself, rather than attacking the evil that is in others.",a:"Confucius"},
  // Your Journey ✨ custom
  {q:"You are not behind. You are on your own timeline.",a:"Anonymous"},
  {q:"Progress, not perfection.",a:"Anonymous"},
  {q:"One good habit is worth a thousand intentions.",a:"Anonymous"},
  {q:"Your future self is watching you right now through your memories.",a:"Anonymous"},
  {q:"Every master was once a disaster.",a:"Anonymous"},
  {q:"The version of you that does the work will thank you later.",a:"Anonymous"},
  {q:"Rest if you must, but don't you quit.",a:"Anonymous"},
  {q:"You've survived 100% of your worst days so far.",a:"Anonymous"},
  {q:"Be the energy you want to attract.",a:"Anonymous"},
  {q:"Discipline is choosing between what you want now and what you want most.",a:"Anonymous"},
  {q:"Slow progress is still progress.",a:"Anonymous"},
  {q:"You don't need more time, you need more focus.",a:"Anonymous"},
  {q:"The secret ingredient is always consistency.",a:"Anonymous"},
  {q:"Today's choices are tomorrow's results.",a:"Anonymous"},
  {q:"Your only competition is who you were yesterday.",a:"Anonymous"},
  {q:"Show up even when you don't feel like it. Especially then.",a:"Anonymous"},
  {q:"A year from now you'll wish you had started today.",a:"Anonymous"},
  {q:"Do it scared. Do it tired. Just do it.",a:"Anonymous"},
  {q:"You are allowed to be both a work in progress and worthy of love.",a:"Anonymous"},
  {q:"The comeback is always stronger than the setback.",a:"Anonymous"},
  {q:"Soft mornings lead to hard days. Hard mornings lead to great days.",a:"Anonymous"},
  {q:"You are doing better than you think.",a:"Anonymous"},
  {q:"Consistency beats intensity every time.",a:"Anonymous"},
  {q:"Don't count the days. Make the days count.",a:"Muhammad Ali"},
  {q:"Float like a butterfly, sting like a bee.",a:"Muhammad Ali"},
  {q:"Impossible is just an opinion.",a:"Muhammad Ali"},
  {q:"It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",a:"Rocky Balboa"},
  {q:"Every day is a new beginning. Take a deep breath, smile and start again.",a:"Anonymous"},
  {q:"The goal is not to be perfect by the end. The goal is to be better today.",a:"Simon Sinek"},
  {q:"Working hard for something we don't care about is called stress. Working hard for something we love is called passion.",a:"Simon Sinek"},
  {q:"Dream big. Start small. But most of all, start.",a:"Simon Sinek"},
  {q:"The more grateful I am, the more beauty I see.",a:"Mary Davis"},
  {q:"Gratitude turns what we have into enough.",a:"Anonymous"},
  {q:"Be thankful for what you have; you'll end up having more.",a:"Oprah Winfrey"},
  {q:"The secret of happiness is not in doing what one likes, but in liking what one does.",a:"James M. Barrie"},
  {q:"Every moment is a fresh beginning.",a:"T.S. Eliot"},
  {q:"Nothing is worth more than this day.",a:"Goethe"},
  {q:"One day or day one. You decide.",a:"Anonymous"},
  {q:"Make today so awesome that yesterday gets jealous.",a:"Anonymous"},
  {q:"You are braver than you believe, stronger than you seem, and smarter than you think.",a:"A.A. Milne"},
  {q:"Promise me you'll always remember: you're braver than you believe.",a:"Winnie the Pooh"},
  {q:"How lucky I am to have something that makes saying goodbye so hard.",a:"A.A. Milne"},
  {q:"Sometimes the smallest step in the right direction ends up being the biggest step of your life.",a:"Anonymous"},
  {q:"It always seems impossible until it's done.",a:"Nelson Mandela"},
  {q:"What you do today can improve all your tomorrows.",a:"Ralph Marston"},
  {q:"Never give up on a dream just because of the time it will take to accomplish it.",a:"Earl Nightingale"},
  {q:"The secret of getting ahead is getting started.",a:"Mark Twain"},
  {q:"All our dreams can come true, if we have the courage to pursue them.",a:"Walt Disney"},
  {q:"The way to get started is to quit talking and begin doing.",a:"Walt Disney"},
  {q:"It's kind of fun to do the impossible.",a:"Walt Disney"},
  {q:"All your dreams are on the other side of your fear.",a:"Anonymous"},
  {q:"You didn't wake up today to be mediocre.",a:"Anonymous"},
  {q:"Collect moments, not things.",a:"Anonymous"},
  {q:"Be a voice, not an echo.",a:"Albert Einstein"},
  {q:"Shine like the whole universe is yours.",a:"Rumi"},
  {q:"What you seek is seeking you.",a:"Rumi"},
  {q:"Let yourself be silently drawn by the strange pull of what you really love.",a:"Rumi"},
  {q:"Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",a:"Rumi"},
  {q:"Out beyond ideas of wrongdoing and rightdoing there is a field. I'll meet you there.",a:"Rumi"},
  {q:"Don't grieve. Anything you lose comes round in another form.",a:"Rumi"},
  {q:"The wound is the place where the Light enters you.",a:"Rumi"},
  {q:"Stop acting so small. You are the universe in ecstatic motion.",a:"Rumi"},
  {q:"Wherever you are, and whatever you do, be in love.",a:"Rumi"},
  {q:"Live life as if everything is rigged in your favour.",a:"Rumi"},
  {q:"Respond to every call that excites your spirit.",a:"Rumi"},
  {q:"Raise your words, not voice. It is rain that grows flowers, not thunder.",a:"Rumi"},
];
const MOODS = [{v:1,e:'😔',l:'Low'},{v:2,e:'😕',l:'Meh'},{v:3,e:'😐',l:'Okay'},{v:4,e:'🙂',l:'Good'},{v:5,e:'😄',l:'Great'}];
const REFLECT = [{p:"What went well today?",i:"🌟"},{p:"What could be better?",i:"🤔"},{p:"I'm grateful for...",i:"🙏"},{p:"Tomorrow I will focus on...",i:"🎯"}];
const STARS = Array.from({length:70},(_,i)=>({left:`${(i*17+7)%100}%`,top:`${(i*23+11)%100}%`,size:i%5===0?2.5:i%3===0?1.5:1,op:0.1+((i*7)%10)*0.07,dur:`${2.5+((i*13)%25)*0.15}s`,delay:`${((i*11)%40)*0.1}s`}));
const DEF_ROUTINES = {
  morning:[{id:1,label:'🌅 Wake up early',s:'pending',r:''},{id:2,label:'💧 Drink water',s:'pending',r:''},{id:3,label:'📵 No phone first hour',s:'pending',r:''},{id:4,label:'🧘 Stretch / exercise',s:'pending',r:''},{id:5,label:'🥗 Healthy breakfast',s:'pending',r:''}],
  evening:[{id:6,label:'📚 Study / read',s:'pending',r:''},{id:7,label:'📝 Review the day',s:'pending',r:''},{id:8,label:'🚫 No junk food',s:'pending',r:''},{id:9,label:'📵 Screen-free wind down',s:'pending',r:''},{id:10,label:'😴 Sleep on time',s:'pending',r:''}]
};

let _uid = null;
const sv = async (k,v)=>{ if(!_uid)return; try{await supabase.from('user_data').upsert({user_id:_uid,key:k,value:JSON.stringify(v)},{onConflict:'user_id,key'});}catch(e){} };
const ld = async k=>{ if(!_uid)return null; try{const{data}=await supabase.from('user_data').select('value').eq('user_id',_uid).eq('key',k).maybeSingle();return data?JSON.parse(data.value):null;}catch(e){return null;} };
const tds = ()=>new Date().toLocaleDateString('en-IN');
const parseDate = s=>{ try{const [d,m,y]=s.split('/');return new Date(+y,+m-1,+d);}catch(e){return new Date();} };

const Card = ({children,style={}})=>(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,boxShadow:'0 4px 24px rgba(0,0,0,0.4)',...style}}>{children}</div>);
const Ti = ({children,sub})=>(<div style={{marginBottom:8}}><div style={{color:C.gold,fontSize:17,fontWeight:'bold',letterSpacing:.5}}>{children}</div>{sub&&<div style={{color:C.dim,fontSize:12,marginTop:3,fontStyle:'italic'}}>{sub}</div>}</div>);
const Btn = ({children,onClick,style={},disabled=false,v='g'})=>(<button onClick={onClick} disabled={disabled} style={{background:v==='r'?'linear-gradient(135deg,#922b21,#641e16)':v==='gr'?'linear-gradient(135deg,#1e8449,#145a32)':`linear-gradient(135deg,${C.gold},#8a5e20)`,border:'none',borderRadius:9,color:v==='g'?'#1a0a2e':'#fff',fontWeight:'bold',cursor:disabled?'not-allowed':'pointer',padding:'10px 18px',fontSize:14,opacity:disabled?.6:1,transition:'transform .15s',...style}} onMouseEnter={e=>{if(!disabled)e.currentTarget.style.transform='scale(1.03)'}} onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'}}>{children}</button>);
const Inp = ({value,onChange,placeholder,type='text',style={},onKeyDown})=>(<input type={type} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} style={{background:'rgba(255,255,255,0.06)',border:`1px solid ${C.border}`,borderRadius:8,color:C.cream,padding:'9px 13px',fontSize:14,outline:'none',width:'100%',boxSizing:'border-box',...style}}/>);
const Tx = ({value,onChange,placeholder,rows=4,style={}})=>(<textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{width:'100%',background:'rgba(255,255,255,0.04)',border:`1px solid ${C.border}`,borderRadius:10,color:C.cream,padding:13,fontSize:14,resize:'vertical',fontFamily:'Georgia,serif',lineHeight:1.9,boxSizing:'border-box',outline:'none',...style}}/>);
const Bar = ({pct,color=C.gold,h=8})=>(<div style={{background:'rgba(255,255,255,0.06)',borderRadius:8,height:h,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.min(pct||0,100)}%`,background:`linear-gradient(to right,${color},${C.goldL})`,borderRadius:8,transition:'width 1s ease'}}/></div>);
const fire = n=>n>=14?'🔥🔥🔥':n>=7?'🔥🔥':n>=3?'🔥':'⭐';

export default function App({ user }) {
  _uid = user.id;
  const userName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Wizard';
  const [tab,setTab]=useState('dashboard');
  const [tk,setTk]=useState(0);
  const [time,setTime]=useState(new Date());
  const [quote]=useState(()=>{
    const d=new Date().toISOString().split('T')[0];
    let h=0; for(let i=0;i<d.length;i++) h=(h*31+d.charCodeAt(i))&0xffffffff;
    return QUOTES[Math.abs(h)%QUOTES.length];
  });
  const [routines,setRoutines]=useState(DEF_ROUTINES);
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState('');
  const [health,setHealth]=useState({fruits:null,junk:null,water:0,meal:0});
  const [sleep,setSleep]=useState({bed:'',wake:''});
  const [sleepH,setSleepH]=useState([]);
  const [editSleepIdx,setEditSleepIdx]=useState(null);
  const [editSleepBed,setEditSleepBed]=useState('');
  const [editSleepWake,setEditSleepWake]=useState('');
  const [hobby,setHobby]=useState({what:'',dur:'',feel:''});
  const [hobbyH,setHobbyH]=useState([]);
  const [ntTitle,setNtTitle]=useState('');
  const [ntBody,setNtBody]=useState('');
  const [notes,setNotes]=useState([]);
  const [editId,setEditId]=useState(null);
  const [editT,setEditT]=useState('');
  const [editB,setEditB]=useState('');
  const [delId,setDelId]=useState(null);
  const [mood,setMood]=useState(null);
  const [moodNote,setMoodNote]=useState('');
  const [moodH,setMoodH]=useState([]);
  const [wGoal,setWGoal]=useState({goal:'',startDate:'',achieved:false});
  const [newGoal,setNewGoal]=useState('');
  const [pastGoals,setPastGoals]=useState([]);
  const [dLog,setDLog]=useState({});
  const [streaks,setStreaks]=useState({routine:0,health:0,mood:0,best:0});
  const [pomMode,setPomMode]=useState('focus');
  const [pomSecs,setPomSecs]=useState(25*60);
  const [pomRunning,setPomRunning]=useState(false);
  const [pomSessions,setPomSessions]=useState(0);
  const [pomTask,setPomTask]=useState('');

  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return ()=>clearInterval(t); },[]);

  useEffect(()=>{
    (async()=>{
      const pairs=[['routines',setRoutines],['tasks',setTasks],['health',setHealth],['sleepH',setSleepH],['hobbyH',setHobbyH],['notes',setNotes],['moodH',setMoodH],['wGoal',setWGoal],['pastGoals',setPastGoals],['dLog',setDLog],['streaks',setStreaks]];
      for(const [k,s] of pairs){ const v=await ld(k); if(v) s(v); }
      // Auto-reset
      const lr=await ld('lastReset');
      const today=tds();
      if(!lr||lr!==today){
        setRoutines(DEF_ROUTINES);
        sv('routines',DEF_ROUTINES);
        sv('lastReset',today);
      }
    })();
  },[]);

  useEffect(()=>{
    const today=tds();
    const allR=[...routines.morning,...routines.evening];
    const rPct=Math.round(allR.filter(r=>r.s==='done').length/10*100);
    const hs=[health.fruits===true,health.junk===true,health.water>=6,health.meal>=3].filter(Boolean).length;
    const mv=moodH.length>0&&moodH[0].date===today?moodH[0].mood:0;
    const score=Math.round(rPct*0.4+(hs/4*100*0.35)+(mv>0?mv/5*100*0.25:0));
    setDLog(prev=>{
      const upd={...prev,[today]:{routinePct:rPct,hScore:hs,mood:mv,score,date:today}};
      sv('dLog',upd);
      const cs=fn=>{let c=0,d=new Date();for(let i=0;i<200;i++){const ds=d.toLocaleDateString('en-IN');if(upd[ds]&&fn(upd[ds])){c++;d.setDate(d.getDate()-1);}else break;}return c;};
      const rs=cs(d=>d.routinePct>=50), hs2=cs(d=>d.hScore>=2), ms=cs(d=>d.mood>0);
      setStreaks(p=>{ const ns={routine:rs,health:hs2,mood:ms,best:Math.max(rs,p.best||0)}; sv('streaks',ns); return ns; });
      return upd;
    });
  },[routines,health,moodH]);

  useEffect(()=>{
    if(!pomRunning)return;
    if(pomSecs===0){setPomRunning(false);if(pomMode==='focus')setPomSessions(n=>n+1);return;}
    const t=setTimeout(()=>setPomSecs(s=>s-1),1000);
    return()=>clearTimeout(t);
  },[pomRunning,pomSecs,pomMode]);

  const go=t=>{setTab(t);setTk(k=>k+1);};
  const createGlitter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const colors = ['#f0d060','#c9a84c','#fff','#e8c0ff','#a0d8ff'];
    for(let i=0;i<10;i++){
      const spark = document.createElement('div');
      const size = Math.random()*5+3;
      spark.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:50%;left:${rect.left+Math.random()*rect.width}px;top:${rect.top+Math.random()*rect.height}px;animation:sparkle .6s ease forwards;box-shadow:0 0 4px ${colors[0]};`;
      document.body.appendChild(spark);
      setTimeout(()=>spark.remove(), 700);
    }
  };

  useEffect(()=>{
    const handleMove = (e) => {
      const spark = document.createElement('div');
      const size = Math.random()*4+2;
      const colors = ['#f0d060','#c9a84c','#ffffff','#e8c0ff'];
      spark.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:50%;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);animation:sparkle .5s ease forwards;`;
      document.body.appendChild(spark);
      setTimeout(()=>spark.remove(), 600);
    };
    window.addEventListener('mousemove', handleMove);
    return ()=>window.removeEventListener('mousemove', handleMove);
  },[]);
  const hr=time.getHours();
  const greeting=hr<12?"Good Morning":hr<17?"Good Afternoon":hr<21?"Good Evening":"Good Night";
  const clock=time.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
  const dateS=time.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const rPct=Math.round([...routines.morning,...routines.evening].filter(r=>r.s==='done').length/10*100);
  const hSc=[health.fruits===true,health.junk===true,health.water>=6,health.meal>=3].filter(Boolean).length;
  const avgM=moodH.length>0?(moodH.slice(0,7).reduce((s,m)=>s+m.mood,0)/Math.min(moodH.length,7)).toFixed(1):null;
  const overall=Math.round(rPct*0.4+(hSc/4*100*0.35)+(mood?mood/5*100*0.25:0));

  const cycleR=async(type,id)=>{
    const nx={pending:'done',done:'missed',missed:'pending'};
    const u={...routines,[type]:routines[type].map(r=>r.id===id?{...r,s:nx[r.s],r:nx[r.s]==='pending'?'':r.r}:r)};
    setRoutines(u);sv('routines',u);
  };
  const setR=async(type,id,reason)=>{ const u={...routines,[type]:routines[type].map(r=>r.id===id?{...r,r:reason}:r)}; setRoutines(u);sv('routines',u); };
  const addTask=async()=>{ if(!newTask.trim())return; const u=[...tasks,{id:Date.now(),text:newTask,done:false}]; setTasks(u);setNewTask('');sv('tasks',u); };
  const togTask=async id=>{ const u=tasks.map(t=>t.id===id?{...t,done:!t.done}:t); setTasks(u);sv('tasks',u); };
  const delTask=async id=>{ const u=tasks.filter(t=>t.id!==id); setTasks(u);sv('tasks',u); };
  const undoTask=async id=>{ const u=tasks.map(t=>t.id===id?{...t,done:false}:t); setTasks(u);sv('tasks',u); };
  const delMood=async i=>{ const u=moodH.filter((_,idx)=>idx!==i); setMoodH(u);sv('moodH',u); if(i===0)setMood(null); };
  const saveSleep=async()=>{ if(!sleep.bed||!sleep.wake)return; const u=[{...sleep,date:tds()},...sleepH.slice(0,6)]; setSleepH(u);sv('sleepH',u); };
  const delSleep=async i=>{ const u=sleepH.filter((_,idx)=>idx!==i); setSleepH(u);sv('sleepH',u); };
  const saveSleepEdit=async(i,bed,wake)=>{ const u=sleepH.map((s,idx)=>idx===i?{...s,bed,wake}:s); setSleepH(u);sv('sleepH',u); };
  const saveHobby=async()=>{ if(!hobby.what)return; const u=[{...hobby,date:tds()},...hobbyH.slice(0,9)]; setHobbyH(u);setHobby({what:'',dur:'',feel:''});sv('hobbyH',u); };
  const saveNote=async()=>{ if(!ntBody.trim())return; const u=[{id:Date.now(),title:ntTitle||'Reflection',body:ntBody,date:tds(),time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})},...notes]; setNotes(u);setNtTitle('');setNtBody('');sv('notes',u); };
  const doDelNote=async id=>{ const u=notes.filter(n=>n.id!==id); setNotes(u);sv('notes',u);setDelId(null); };
  const saveEdit=async()=>{ const u=notes.map(n=>n.id===editId?{...n,title:editT,body:editB}:n); setNotes(u);sv('notes',u);setEditId(null); };
  const saveMood=async()=>{ if(!mood)return; const u=[{mood,note:moodNote,date:tds()},...moodH.slice(0,13)]; setMoodH(u);setMoodNote('');sv('moodH',u); };
  const saveGoal=async()=>{ if(!newGoal.trim())return; if(wGoal.goal){const pg=[wGoal,...pastGoals.slice(0,9)];setPastGoals(pg);sv('pastGoals',pg);} const g={goal:newGoal,startDate:tds(),achieved:false}; setWGoal(g);setNewGoal('');sv('wGoal',g); };
  const togGoal=async()=>{ const g={...wGoal,achieved:!wGoal.achieved}; setWGoal(g);sv('wGoal',g); };
  const delCurrentGoal=async()=>{ if(wGoal.goal){const pg=[wGoal,...pastGoals.slice(0,9)];setPastGoals(pg);sv('pastGoals',pg);} setWGoal({goal:'',startDate:'',achieved:false});sv('wGoal',{goal:'',startDate:'',achieved:false}); };
  const delPastGoal=async i=>{ const u=pastGoals.filter((_,idx)=>idx!==i); setPastGoals(u);sv('pastGoals',u); };
  const POM_DUR={focus:25*60,short:5*60,long:15*60};
  const switchPom=m=>{setPomMode(m);setPomSecs(POM_DUR[m]);setPomRunning(false);};
  const pomDisplay=`${String(Math.floor(pomSecs/60)).padStart(2,'0')}:${String(pomSecs%60).padStart(2,'0')}`;

  const heatDates=Array.from({length:35},(_,i)=>{const d=new Date();d.setDate(d.getDate()-34+i);return d.toLocaleDateString('en-IN');});
  const yesterdayS=(()=>{const d=new Date();d.setDate(d.getDate()-1);return d.toLocaleDateString('en-IN');})();
  const fmtDate=s=>{try{const[d,m,y]=s.split('/');return new Date(+y,+m-1,+d).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});}catch(e){return s;}};
  const heatColor=s=>{if(s===undefined||s===null)return 'rgba(255,255,255,0.05)';if(s>=75)return 'rgba(201,168,76,0.9)';if(s>=50)return 'rgba(201,168,76,0.5)';if(s>=25)return 'rgba(230,126,34,0.5)';return 'rgba(192,57,43,0.45)';};
  const weekEntries=Object.entries(dLog).sort((a,b)=>parseDate(a[0])-parseDate(b[0])).slice(-7);
  const recentDays=[...new Set([...Object.keys(dLog),...notes.map(n=>n.date),...sleepH.map(s=>s.date),...hobbyH.map(h=>h.date),...moodH.map(m=>m.date)])].sort((a,b)=>parseDate(b)-parseDate(a)).slice(0,30);

  const S = {
    dashboard:()=>(
      <div>
        <div style={{background:'linear-gradient(135deg,rgba(74,28,110,0.5),rgba(26,10,46,0.7))',border:'1px solid rgba(201,168,76,0.55)',borderRadius:14,padding:20,animation:'quoteGlow 4s ease-in-out infinite',boxShadow:'0 0 30px rgba(201,168,76,0.15)'}}>
          <div style={{fontSize:11,color:C.gold,letterSpacing:3,marginBottom:10,textAlign:'center',fontWeight:'bold'}}>✨ WISDOM OF THE DAY ✨</div>
          <div style={{fontSize:17,fontStyle:'italic',color:C.cream,lineHeight:2,fontFamily:'Georgia,serif',textAlign:'center'}}>"{quote.q}"</div>
        </div>

        {health.water<6&&(
          <div style={{background:'rgba(52,152,219,0.1)',border:'1px solid rgba(52,152,219,0.3)',borderRadius:12,padding:'10px 14px',marginTop:12,display:'flex',alignItems:'center',gap:10,animation:'fadeSlideUp .4s ease both'}}>
            <span style={{fontSize:22}}>💧</span>
            <div style={{flex:1}}>
              <div style={{color:'#7fb3d3',fontSize:13,fontWeight:'bold'}}>Stay Hydrated!</div>
              <div style={{color:C.dim,fontSize:12}}>You've had {health.water}/8 glasses — drink up!</div>
            </div>
            <button onClick={()=>go('health')} style={{background:'none',border:'1px solid rgba(52,152,219,0.4)',borderRadius:8,color:'#7fb3d3',cursor:'pointer',padding:'4px 10px',fontSize:12}}>Log +</button>
          </div>
        )}

        <Card style={{marginTop:12}}>
          <Ti>🔥 Habit Streaks</Ti>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
            {[{l:'Routine',v:streaks.routine,i:'🕯️'},{l:'Health',v:streaks.health,i:'🧪'},{l:'Mood',v:streaks.mood,i:'🔮'}].map((s,i)=>(
              <div key={s.l} style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:10,padding:'10px 6px',textAlign:'center',animation:`fadeSlideUp .4s ease ${i*.1}s both`}}>
                <div style={{fontSize:16}}>{s.i}</div>
                <div style={{fontSize:22,fontWeight:'bold',color:C.gold}}>{s.v}</div>
                <div style={{fontSize:13}}>{fire(s.v)}</div>
                <div style={{fontSize:10,color:C.dim,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
          {streaks.best>0&&<div style={{textAlign:'center',marginTop:8,fontSize:12,color:C.dim}}>🏆 Best streak: <span style={{color:C.gold,fontWeight:'bold'}}>{streaks.best} days</span></div>}
        </Card>

        {wGoal.goal&&(
          <Card style={{marginTop:12,background:'linear-gradient(135deg,rgba(26,71,49,0.3),rgba(13,11,30,0.6))'}}>
            <Ti>🎯 This Week's Goal</Ti>
            <div style={{color:C.text,fontSize:14,fontStyle:'italic',marginBottom:8}}>"{wGoal.goal}"</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:12,color:C.dim}}>Since {wGoal.startDate}</span>
              <span style={{fontSize:16}}>{wGoal.achieved?'🏆 Achieved!':'⏳ In progress'}</span>
            </div>
          </Card>
        )}

        <Card style={{marginTop:12}}>
          <Ti>⚡ Today's Tasks</Ti>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <Inp value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Add a task..." onKeyDown={e=>e.key==='Enter'&&addTask()} style={{flex:1}}/>
            <Btn onClick={addTask} style={{padding:'8px 14px',flexShrink:0}}>＋</Btn>
          </div>
          <div style={{marginTop:10}}>
            {tasks.filter(t=>!t.done).map((t,i)=>(
              <div key={t.id} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <input type="checkbox" onChange={()=>togTask(t.id)} style={{accentColor:C.gold,cursor:'pointer',width:15,height:15}}/>
                <span style={{flex:1,color:C.text,fontSize:13}}>{t.text}</span>
                <button onClick={()=>delTask(t.id)} style={{background:'none',border:'none',color:C.dim,cursor:'pointer',fontSize:14}} onMouseEnter={e=>e.target.style.color='#e74c3c'} onMouseLeave={e=>e.target.style.color=C.dim}>✕</button>
              </div>
            ))}
            {tasks.filter(t=>t.done).slice(0,3).map(t=>(<div key={t.id} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',opacity:.6}}><input type="checkbox" checked readOnly style={{accentColor:C.gold,width:15,height:15}}/><span style={{flex:1,color:C.dim,fontSize:13,textDecoration:'line-through'}}>{t.text}</span><button onClick={()=>undoTask(t.id)} title="Undo" style={{background:'none',border:'1px solid rgba(201,168,76,0.3)',borderRadius:6,color:C.gold,cursor:'pointer',padding:'2px 8px',fontSize:11}}>↩ Undo</button><button onClick={()=>delTask(t.id)} style={{background:'none',border:'none',color:C.dim,cursor:'pointer',fontSize:13}} onMouseEnter={e=>e.target.style.color='#e74c3c'} onMouseLeave={e=>e.target.style.color=C.dim}>✕</button></div>))}
            {tasks.length===0&&<div style={{color:C.dim,fontSize:13,textAlign:'center',padding:12}}>No tasks yet — add your first! ✨</div>}
          </div>
        </Card>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
          <Card><Ti>🔮 Mood</Ti><div style={{fontSize:36,textAlign:'center',marginTop:4}}>{mood?MOODS[mood-1].e:'—'}</div><div style={{textAlign:'center',color:C.dim,fontSize:11,marginTop:2}}>{mood?MOODS[mood-1].l:'Not set'}</div></Card>
          <Card><Ti>🕯️ Routine</Ti><div style={{fontSize:13,color:C.text,marginTop:6}}>☀️ {routines.morning.filter(r=>r.s==='done').length}/5</div><div style={{fontSize:13,color:C.text,marginTop:4}}>🌙 {routines.evening.filter(r=>r.s==='done').length}/5</div><div style={{marginTop:8}}><Bar pct={rPct}/></div></Card>
        </div>

        <Card style={{marginTop:12,background:'linear-gradient(135deg,rgba(74,28,110,0.3),rgba(13,11,30,0.6))'}}>
            <Ti>🌙 Brief Your Day</Ti>
            <Tx value={ntBody} onChange={e=>setNtBody(e.target.value)} placeholder="Write whatever's on your mind..." rows={4}/>
            <Btn onClick={()=>{ if(!ntBody.trim())return; const u=[{id:Date.now(),title:'Day Wrap-Up — '+tds(),body:ntBody,date:tds(),time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})},...notes]; setNotes(u);setNtBody('');sv('notes',u); }} style={{width:'100%',padding:'10px',marginTop:8}}>✨ Save your reflections</Btn>
        </Card>
      </div>
    ),

    routine:()=>(
      <div>
        {['morning','evening'].map((type,ti)=>(
          <Card key={type} style={{marginBottom:14,animation:`fadeSlideUp .4s ease ${ti*.12}s both`}}>
            <Ti sub="Tap to cycle: ⬜ pending → ✅ done → ❌ missed">{type==='morning'?'🌅 Morning Spells':'🌙 Evening Spells'}</Ti>
            {routines[type].map((item,i)=>{
              const bg=item.s==='done'?'rgba(39,174,96,0.1)':item.s==='missed'?'rgba(192,57,43,0.1)':'rgba(255,255,255,0.03)';
              const bc=item.s==='done'?'rgba(39,174,96,0.4)':item.s==='missed'?'rgba(192,57,43,0.4)':'rgba(255,255,255,0.07)';
              return (
                <div key={item.id} style={{marginBottom:6,animation:`fadeSlideUp .35s ease ${i*.06}s both`}}>
                  <div onClick={()=>cycleR(type,item.id)} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderRadius:10,background:bg,border:`1px solid ${bc}`,cursor:'pointer',transition:'all .2s'}}>
                    <span style={{fontSize:16}}>{item.s==='done'?'✅':item.s==='missed'?'❌':'⬜'}</span>
                    <span style={{color:item.s==='done'?'rgba(39,174,96,0.9)':item.s==='missed'?'rgba(231,76,60,0.9)':C.text,textDecoration:item.s==='done'?'line-through':'none',fontSize:14,flex:1}}>{item.label}</span>
                  </div>
                  {item.s==='missed'&&(
                    <Inp value={item.r} onChange={e=>setR(type,item.id,e.target.value)} placeholder="Why did you miss it?" style={{borderRadius:'0 0 8px 8px',fontSize:12,padding:'6px 12px',marginTop:2}}/>
                  )}
                </div>
              );
            })}
            <div style={{marginTop:10}}><Bar pct={routines[type].filter(r=>r.s==='done').length/5*100} color={type==='morning'?C.gold:'rgba(155,89,182,0.9)'}/></div>
          </Card>
        ))}
      </div>
    ),

    health:()=>(
      <Card>
        <Ti>🧪 Today's Potion Log</Ti>
        <div style={{marginTop:12}}>
          {[{label:'🍎 Ate fruits today?',key:'fruits'},{label:'🚫 Avoided junk food?',key:'junk'}].map(item=>(
            <div key={item.key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <span style={{color:C.text,fontSize:14}}>{item.label}</span>
              <div style={{display:'flex',gap:8}}>
                {['Yes','No'].map(o=>{const act=o==='Yes'?health[item.key]===true:health[item.key]===false;return(<button key={o} onClick={()=>{const u={...health,[item.key]:o==='Yes'};setHealth(u);sv('health',u);}} style={{padding:'5px 16px',borderRadius:20,border:`1px solid ${C.gold}`,background:act?C.gold:'transparent',color:act?'#1a0a2e':C.gold,cursor:'pointer',fontSize:13,transition:'all .2s'}}>{o}</button>);})}
              </div>
            </div>
          ))}
          <div style={{padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{color:C.text,fontSize:14,marginBottom:8}}>💧 Water intake (glasses)</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {[1,2,3,4,5,6,7,8].map(n=>(<button key={n} onClick={()=>{const u={...health,water:n};setHealth(u);sv('health',u);}} style={{width:34,height:34,borderRadius:'50%',border:`1px solid ${C.gold}`,background:health.water>=n?C.gold:'transparent',color:health.water>=n?'#1a0a2e':C.gold,cursor:'pointer',fontSize:13,fontWeight:'bold',transition:'all .2s'}}>{n}</button>))}
            </div>
          </div>
          <div style={{padding:'12px 0'}}>
            <div style={{color:C.text,fontSize:14,marginBottom:8}}>🌿 Meal quality today</div>
            <div style={{display:'flex',gap:8}}>
              {[[1,'Poor'],[2,'Fair'],[3,'Good'],[4,'Great'],[5,'🌟']].map(([v,l])=>(<button key={v} onClick={()=>{const u={...health,meal:Number(v)};setHealth(u);sv('health',u);}} style={{flex:1,padding:'7px 4px',borderRadius:8,border:`1px solid ${C.gold}`,background:health.meal===Number(v)?C.gold:'transparent',color:health.meal===Number(v)?'#1a0a2e':C.gold,cursor:'pointer',fontSize:12,transition:'all .2s'}}>{l}</button>))}
            </div>
          </div>
        </div>
        <div style={{marginTop:12}}><Bar pct={(hSc/4)*100} h={10}/></div>
        <div style={{textAlign:'right',fontSize:11,color:C.dim,marginTop:4}}>Health Score: {hSc}/4</div>
      </Card>
    ),

    sleep:()=>(
      <div>
        <Card>
          <Ti>🌙 Log Tonight's Sleep</Ti>
          <div style={{marginTop:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div><div style={{color:C.dim,fontSize:12,marginBottom:5}}>🛏️ Bedtime</div><Inp type="time" value={sleep.bed} onChange={e=>setSleep({...sleep,bed:e.target.value})}/></div>
            <div><div style={{color:C.dim,fontSize:12,marginBottom:5}}>☀️ Wake time</div><Inp type="time" value={sleep.wake} onChange={e=>setSleep({...sleep,wake:e.target.value})}/></div>
          </div>
          <Btn onClick={saveSleep} style={{width:'100%',marginTop:14,padding:'10px'}}>✨ Save Entry</Btn>
        </Card>
        {sleepH.length>0&&(
          <Card style={{marginTop:14}}>
            <Ti>📊 Sleep History</Ti>
            {sleepH.map((s,i)=>(
              <div key={i} style={{padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                {editSleepIdx===i?(
                  <div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
                      <div><div style={{color:C.dim,fontSize:11,marginBottom:4}}>🛏️ Bedtime</div><Inp type="time" value={editSleepBed} onChange={e=>setEditSleepBed(e.target.value)}/></div>
                      <div><div style={{color:C.dim,fontSize:11,marginBottom:4}}>☀️ Wake time</div><Inp type="time" value={editSleepWake} onChange={e=>setEditSleepWake(e.target.value)}/></div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <Btn onClick={()=>{saveSleepEdit(i,editSleepBed,editSleepWake);setEditSleepIdx(null);}} style={{flex:1,padding:'7px'}}>💾 Save</Btn>
                      <Btn onClick={()=>setEditSleepIdx(null)} v='r' style={{flex:1,padding:'7px'}}>Cancel</Btn>
                    </div>
                  </div>
                ):(
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:13}}>
                    <span style={{color:C.dim}}>{s.date}</span>
                    <span style={{color:C.text}}>🛏️ {s.bed} → ☀️ {s.wake}</span>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>{setEditSleepIdx(i);setEditSleepBed(s.bed);setEditSleepWake(s.wake);}} style={{background:'none',border:'1px solid rgba(201,168,76,0.3)',borderRadius:6,color:C.gold,cursor:'pointer',padding:'2px 8px',fontSize:11}}>✏️</button>
                      <button onClick={()=>delSleep(i)} style={{background:'none',border:'1px solid rgba(192,57,43,0.3)',borderRadius:6,color:'rgba(231,76,60,0.7)',cursor:'pointer',padding:'2px 8px',fontSize:11}}>🗑️</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Card>
        )}
      </div>
    ),

    hobby:()=>(
      <div>
        <div style={{background:'linear-gradient(135deg,rgba(26,71,49,0.35),rgba(13,11,30,0.65))',border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
          <Ti sub="No pressure, no streaks — enjoy and record when you feel like it 🌸">🎨 Free Period</Ti>
          <div style={{marginBottom:12}}><div style={{color:C.dim,fontSize:13,marginBottom:6,fontStyle:'italic'}}>What did you do?</div><Inp value={hobby.what} onChange={e=>setHobby({...hobby,what:e.target.value})} placeholder="e.g. Painted a landscape, stitched a pattern..."/></div>
          <div style={{marginBottom:12}}><div style={{color:C.dim,fontSize:12,marginBottom:5}}>How long?</div><Inp value={hobby.dur} onChange={e=>setHobby({...hobby,dur:e.target.value})} placeholder="e.g. 45 minutes"/></div>
          <div style={{marginBottom:16}}><div style={{color:C.dim,fontSize:12,marginBottom:6}}>How did it feel?</div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{['😌 Relaxed','✨ Creative','🔥 Energized','😊 Happy'].map(f=>(<button key={f} onClick={()=>setHobby({...hobby,feel:f})} style={{padding:'7px 12px',borderRadius:20,border:'1px solid rgba(201,168,76,0.3)',background:hobby.feel===f?'rgba(201,168,76,0.18)':'transparent',color:C.text,cursor:'pointer',fontSize:12,transition:'all .2s'}}>{f}</button>))}</div></div>
          <Btn onClick={saveHobby} style={{width:'100%',padding:'10px'}}>✨ Log this session</Btn>
        </div>
        {hobbyH.length>0&&(<Card style={{marginTop:14}}><Ti>📖 Hobby Journal</Ti>{hobbyH.slice(0,5).map((h,i)=>(<div key={i} style={{padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:C.text,fontSize:14}}>{h.what}</span><span style={{color:C.dim,fontSize:11}}>{h.date}</span></div><div style={{color:C.dim,fontSize:12,marginTop:2}}>{h.dur&&`⏱️ ${h.dur}`}{h.dur&&h.feel&&' • '}{h.feel}</div></div>))}</Card>)}
      </div>
    ),

    notes:()=>(
      <div>
        <Card style={{background:'linear-gradient(135deg,rgba(74,28,110,0.28),rgba(13,11,30,0.7))'}}>
          <Ti>📜 Write in your Journal</Ti>
          <Inp value={ntTitle} onChange={e=>setNtTitle(e.target.value)} placeholder="Title" style={{marginTop:10,marginBottom:8}}/>
          <Tx value={ntBody} onChange={e=>setNtBody(e.target.value)} placeholder="Express your thoughts, feelings, reflections... this is your safe space 🌙✨" rows={5}/>
          <Btn onClick={saveNote} style={{width:'100%',padding:'10px',marginTop:8}}>✨ Save Entry</Btn>
        </Card>
        <div style={{marginTop:14}}>
          {notes.length===0&&<div style={{textAlign:'center',color:C.dim,padding:24}}>Your journal awaits your first thought... 📜</div>}
          {notes.map((n,i)=>(
            <Card key={n.id} style={{marginBottom:12,animation:`fadeSlideUp .35s ease ${i*.07}s both`}}>
              {editId===n.id?(
                <div>
                  <Inp value={editT} onChange={e=>setEditT(e.target.value)} style={{marginBottom:8}}/>
                  <Tx value={editB} onChange={e=>setEditB(e.target.value)} rows={4}/>
                  <div style={{display:'flex',gap:8,marginTop:8}}>
                    <Btn onClick={saveEdit} style={{flex:1,padding:'8px'}}>💾 Save</Btn>
                    <Btn onClick={()=>setEditId(null)} v='r' style={{flex:1,padding:'8px'}}>Cancel</Btn>
                  </div>
                </div>
              ):(
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:4}}>
                    <span style={{color:C.gold,fontSize:14,fontWeight:'bold'}}>{n.title}</span>
                    <span style={{color:C.dim,fontSize:11}}>{n.date} · {n.time}</span>
                  </div>
                  <div style={{color:C.text,fontSize:13,lineHeight:1.8,fontFamily:'Georgia,serif',whiteSpace:'pre-wrap',marginBottom:10}}>{n.body}</div>
                  <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                    <button onClick={()=>{setEditId(n.id);setEditT(n.title);setEditB(n.body);}} style={{background:'none',border:'1px solid rgba(201,168,76,0.3)',borderRadius:7,color:C.gold,cursor:'pointer',padding:'4px 12px',fontSize:12}}>✏️ Edit</button>
                    <button onClick={()=>{if(delId===n.id)doDelNote(n.id);else setDelId(n.id);}}
                      style={{background:delId===n.id?'rgba(192,57,43,0.2)':'none',border:`1px solid ${delId===n.id?'rgba(192,57,43,0.6)':'rgba(192,57,43,0.3)'}`,borderRadius:7,color:'rgba(231,76,60,0.8)',cursor:'pointer',padding:'4px 12px',fontSize:12}}>
                      {delId===n.id?'⚠️ Confirm?':'🗑️ Delete'}
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    ),

    mood:()=>(
      <div>
        <Card>
          <Ti>🔮 How are you feeling today?</Ti>
          <div style={{display:'flex',justifyContent:'space-around',marginTop:16,marginBottom:4}}>
            {MOODS.map(m=>(<div key={m.v} onClick={()=>setMood(m.v)} style={{textAlign:'center',cursor:'pointer',padding:'10px 8px',borderRadius:12,background:mood===m.v?'rgba(201,168,76,0.18)':'transparent',border:`2px solid ${mood===m.v?C.gold:'transparent'}`,transition:'all .25s',minWidth:48,transform:mood===m.v?'scale(1.15)':'scale(1)'}}><div style={{fontSize:30}}>{m.e}</div><div style={{fontSize:11,color:C.dim,marginTop:4}}>{m.l}</div></div>))}
          </div>
          <Tx value={moodNote} onChange={e=>setMoodNote(e.target.value)} placeholder="What's on your mind? ✨" rows={3} style={{marginTop:12}}/>
          <Btn onClick={saveMood} style={{width:'100%',padding:'10px',marginTop:8}}>✨ Save Mood</Btn>
        </Card>
        {moodH.length>0&&(<Card style={{marginTop:14}}><Ti>📊 Mood History</Ti>{moodH.slice(0,7).map((m,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}><span style={{fontSize:22}}>{MOODS[m.mood-1]?.e}</span><div style={{flex:1}}><div style={{fontSize:13,color:C.text}}>{MOODS[m.mood-1]?.l}</div>{m.note&&<div style={{fontSize:11,color:C.dim}}>{m.note}</div>}</div><span style={{fontSize:11,color:C.dim,marginRight:6}}>{m.date}</span><button onClick={()=>delMood(i)} title="Delete" style={{background:'none',border:'1px solid rgba(192,57,43,0.3)',borderRadius:6,color:'rgba(231,76,60,0.7)',cursor:'pointer',padding:'2px 8px',fontSize:11,flexShrink:0}}>🗑️</button></div>))}</Card>)}
      </div>
    ),

    goals:()=>(
      <div>
        <Card>
          <Ti sub="Set one clear intention for the week ahead ✨">🎯 Weekly Goal</Ti>
          <Tx value={newGoal} onChange={e=>setNewGoal(e.target.value)} placeholder="" rows={3} style={{marginTop:10}}/>
          <Btn onClick={saveGoal} style={{width:'100%',padding:'10px',marginTop:10}}>🎯 Set This Week's Goal</Btn>
        </Card>
        {wGoal.goal&&(
          <Card style={{marginTop:14,border:`1px solid ${wGoal.achieved?'rgba(39,174,96,0.5)':C.border}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
              <Ti>🎯 Current Goal</Ti>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <span style={{fontSize:11,color:C.dim}}>{wGoal.startDate}</span>
                <button onClick={delCurrentGoal} title="Delete goal" style={{background:'none',border:'1px solid rgba(192,57,43,0.3)',borderRadius:6,color:'rgba(231,76,60,0.7)',cursor:'pointer',padding:'2px 8px',fontSize:11}}>🗑️</button>
              </div>
            </div>
            <div style={{color:C.cream,fontSize:15,fontStyle:'italic',lineHeight:1.7,marginBottom:12}}>"{wGoal.goal}"</div>
            <Btn onClick={togGoal} v={wGoal.achieved?'gr':'g'} style={{width:'100%',padding:'10px'}}>{wGoal.achieved?'🏆 Achieved! (tap to undo)':'✅ Mark as Achieved'}</Btn>
          </Card>
        )}
        {pastGoals.length>0&&(
          <Card style={{marginTop:14}}>
            <Ti>📖 Past Goals</Ti>
            {pastGoals.map((g,i)=>(
              <div key={i} style={{padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div><div style={{color:C.text,fontSize:13,fontStyle:'italic'}}>"{g.goal}"</div><div style={{color:C.dim,fontSize:11,marginTop:2}}>{g.startDate}</div></div>
                <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                  <span style={{fontSize:18}}>{g.achieved?'🏆':'😔'}</span>
                  <button onClick={()=>delPastGoal(i)} style={{background:'none',border:'1px solid rgba(192,57,43,0.3)',borderRadius:6,color:'rgba(231,76,60,0.7)',cursor:'pointer',padding:'2px 8px',fontSize:11}}>🗑️</button>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    ),

    pomodoro:()=>(
      <div>
        <Card style={{textAlign:'center'}}>
          <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:20}}>
            {[['focus','🔥 Focus','25m'],['short','☕ Short Break','5m'],['long','🌙 Long Break','15m']].map(([m,lbl,dur])=>(
              <button key={m} onClick={()=>switchPom(m)} style={{flex:1,padding:'8px 4px',borderRadius:10,border:`1px solid ${pomMode===m?C.gold:'rgba(255,255,255,0.1)'}`,background:pomMode===m?'rgba(201,168,76,0.15)':'transparent',color:pomMode===m?C.gold:C.dim,cursor:'pointer',fontSize:12,fontWeight:'bold',transition:'all .2s'}}>
                <div>{lbl}</div><div style={{fontSize:10,opacity:.7,marginTop:2}}>{dur}</div>
              </button>
            ))}
          </div>

          <div style={{width:190,height:190,borderRadius:'50%',border:`4px solid ${pomRunning?C.gold:'rgba(201,168,76,0.3)'}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',boxShadow:pomRunning?`0 0 40px rgba(201,168,76,0.4), inset 0 0 30px rgba(0,0,0,0.5)`:'inset 0 0 30px rgba(0,0,0,0.5)',background:'rgba(0,0,0,0.3)',transition:'all .4s'}}>
            <div>
              <div style={{fontSize:46,fontWeight:'bold',color:C.gold,fontFamily:'monospace',letterSpacing:3}}>{pomDisplay}</div>
              <div style={{fontSize:11,color:C.dim,marginTop:4,textTransform:'uppercase',letterSpacing:2}}>{pomMode==='focus'?'Focus':pomMode==='short'?'Short Break':'Long Break'}</div>
            </div>
          </div>

          <Inp value={pomTask} onChange={e=>setPomTask(e.target.value)} placeholder="What are you focusing on?" style={{marginBottom:14,textAlign:'center'}}/>

          <div style={{display:'flex',gap:8,justifyContent:'center'}}>
            <Btn onClick={()=>setPomRunning(r=>!r)} style={{padding:'10px 32px',fontSize:15}}>
              {pomRunning?'⏸ Pause':'▶ Start'}
            </Btn>
            <Btn onClick={()=>{setPomRunning(false);setPomSecs(POM_DUR[pomMode]);}} v='r' style={{padding:'10px 18px'}}>↺ Reset</Btn>
          </div>
        </Card>

        {pomSessions>0&&(
          <Card style={{marginTop:14,textAlign:'center'}}>
            <div style={{fontSize:13,color:C.dim,marginBottom:6}}>Today's Focus Sessions</div>
            <div style={{fontSize:38,fontWeight:'bold',color:C.gold}}>{pomSessions}</div>
            <div style={{display:'flex',justifyContent:'center',gap:4,marginTop:8,flexWrap:'wrap'}}>
              {Array.from({length:pomSessions},(_,i)=>(<span key={i} style={{fontSize:18}}>🍅</span>))}
            </div>
            <div style={{color:C.dim,fontSize:12,marginTop:6}}>{pomSessions*25} minutes of deep work ✨</div>
          </Card>
        )}

        <Card style={{marginTop:14}}>
          <Ti>💡 How it works</Ti>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:4}}>
            {[['🔥','Focus for 25 minutes without distractions'],['☕','Take a 5-minute short break'],['🔁','Repeat 4 times'],['🌙','Then take a 15-minute long break']].map(([i,t])=>(
              <div key={t} style={{display:'flex',gap:10,alignItems:'center'}}><span style={{fontSize:18}}>{i}</span><span style={{color:C.text,fontSize:13}}>{t}</span></div>
            ))}
          </div>
        </Card>
      </div>
    ),

    analytics:()=>(
      <div>
        <div style={{background:'linear-gradient(135deg,rgba(74,28,110,0.45),rgba(13,11,30,0.7))',border:'1px solid rgba(201,168,76,0.4)',borderRadius:14,padding:18,marginBottom:14,textAlign:'center',animation:'fadeSlideUp .4s ease both'}}>
          <div style={{fontSize:11,color:C.gold,letterSpacing:2,marginBottom:6}}>✨ TODAY'S OVERALL PROGRESS ✨</div>
          <div style={{fontSize:52,fontWeight:'bold',color:C.gold,textShadow:`0 0 20px ${C.gold}`,animation:'popIn .5s ease'}}>{overall}<span style={{fontSize:22}}>%</span></div>
          <div style={{color:C.dim,fontSize:12,marginTop:4}}>Routine 40% · Health 35% · Mood 25%</div>
          <div style={{marginTop:12}}><Bar pct={overall} h={12}/></div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:14}}>
          {[{l:'Routine',v:`${rPct}%`,i:'🕯️',p:rPct},{l:'Health',v:`${hSc}/4`,i:'🧪',p:hSc/4*100},{l:'Avg Mood',v:avgM?`${avgM}/5`:'—',i:'🔮',p:avgM?avgM/5*100:0},{l:'Best Streak',v:`${streaks.best}d`,i:'🏆',p:Math.min(streaks.best*7,100)}].map((s,i)=>(
            <Card key={s.l} style={{textAlign:'center',animation:`fadeSlideUp .4s ease ${i*.1}s both`}}>
              <div style={{fontSize:24}}>{s.i}</div>
              <div style={{fontSize:24,fontWeight:'bold',color:C.gold,marginTop:4}}>{s.v}</div>
              <div style={{fontSize:11,color:C.dim,marginTop:2,marginBottom:8}}>{s.l}</div>
              <Bar pct={s.p} h={5}/>
            </Card>
          ))}
        </div>

        {/* HEATMAP */}
        <Card style={{marginBottom:14}}>
          <Ti sub="Last 5 weeks — hover a square to see your score">📅 Activity Heatmap</Ti>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:8,marginTop:4}}>
            {[['rgba(255,255,255,0.05)','No data'],['rgba(192,57,43,0.45)','Low'],['rgba(230,126,34,0.5)','Okay'],['rgba(201,168,76,0.5)','Good'],['rgba(201,168,76,0.9)','Great']].map(([col,lbl])=>(
              <span key={lbl} style={{display:'flex',alignItems:'center',gap:3,fontSize:10,color:C.dim}}>
                <span style={{width:10,height:10,background:col,borderRadius:2,display:'inline-block',border:'1px solid rgba(255,255,255,0.05)'}}/>
                {lbl}
              </span>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:4}}>
            {['M','T','W','T','F','S','S'].map((d,i)=>(<div key={i} style={{textAlign:'center',fontSize:9,color:C.dim,paddingBottom:3}}>{d}</div>))}
            {heatDates.map((date,i)=>(
              <div key={i} title={`${date}: ${dLog[date]?.score||0}%`}
                style={{aspectRatio:'1',background:heatColor(dLog[date]?.score),borderRadius:3,cursor:'default',transition:'transform .15s',border:'1px solid rgba(255,255,255,0.03)'}}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.3)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
            ))}
          </div>
        </Card>

        <Card style={{marginBottom:14}}>
          <Ti sub="Your day-by-day activity log">📋 Recent Activity</Ti>
          {recentDays.length===0&&<div style={{color:C.dim,fontSize:13,textAlign:'center',padding:16}}>Start logging to see your history ✨</div>}
          {recentDays.map((date,i)=>{
            const d=dLog[date];
            const dayNotes=notes.filter(n=>n.date===date);
            const daySleep=sleepH.find(s=>s.date===date);
            const dayHobby=hobbyH.filter(h=>h.date===date);
            const dayMood=moodH.find(m=>m.date===date);
            const isToday=date===tds();
            const moodVal=dayMood?.mood||d?.mood||0;
            const hasAny=d||dayNotes.length||daySleep||dayHobby.length||dayMood;
            if(!hasAny)return null;
            return(
              <div key={date} style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:12,marginBottom:12,animation:`fadeSlideUp .3s ease ${Math.min(i,.1)*0.07}s both`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                  <div style={{display:'flex',alignItems:'center',gap:7}}>
                    <span style={{fontSize:13,color:C.gold,fontWeight:'bold'}}>{isToday?'Today':date===yesterdayS?'Yesterday':fmtDate(date)}</span>
                    {isToday&&<span style={{fontSize:9,background:'rgba(201,168,76,0.18)',color:C.gold,padding:'2px 7px',borderRadius:10,border:'1px solid rgba(201,168,76,0.3)',fontWeight:'bold',letterSpacing:1}}>NOW</span>}
                    {date===yesterdayS&&<span style={{fontSize:9,background:'rgba(255,255,255,0.08)',color:C.dim,padding:'2px 7px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',letterSpacing:1}}>YESTERDAY</span>}
                  </div>
                  {d?.score!==undefined&&<span style={{fontSize:13,fontWeight:'bold',color:d.score>=75?'rgba(39,174,96,0.9)':d.score>=50?C.gold:'rgba(230,126,34,0.8)',background:d.score>=75?'rgba(39,174,96,0.08)':d.score>=50?'rgba(201,168,76,0.08)':'rgba(230,126,34,0.08)',padding:'2px 10px',borderRadius:8,border:`1px solid ${d.score>=75?'rgba(39,174,96,0.25)':d.score>=50?'rgba(201,168,76,0.25)':'rgba(230,126,34,0.25)'}`}}>{d.score}%</span>}
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:10,fontSize:12,color:C.text,marginBottom:4}}>
                  {d?.routinePct!==undefined&&<span>🕯️ {Math.round(d.routinePct/10*10)/10}% routines</span>}
                  {d?.hScore!==undefined&&<span>🧪 {d.hScore}/4 health</span>}
                  {moodVal>0&&<span>🔮 {MOODS[moodVal-1]?.e} {MOODS[moodVal-1]?.l}</span>}
                </div>
                {(dayNotes.length>0||daySleep||dayHobby.length>0)&&(
                  <div style={{display:'flex',flexDirection:'column',gap:3,marginTop:4}}>
                    {dayNotes.map(n=>(<span key={n.id} style={{fontSize:11,color:C.dim}}>📜 {n.title} <span style={{opacity:.6}}>· {n.time}</span></span>))}
                    {daySleep&&<span style={{fontSize:11,color:C.dim}}>😴 {daySleep.bed} → {daySleep.wake}</span>}
                    {dayHobby.map((h,j)=>(<span key={j} style={{fontSize:11,color:C.dim}}>🎨 {h.what}{h.dur?` · ${h.dur}`:''}{h.feel?` · ${h.feel}`:''}</span>))}
                  </div>
                )}
              </div>
            );
          })}
        </Card>

        {weekEntries.length>1&&(
          <Card style={{marginBottom:14}}>
            <Ti>📈 Weekly Progress Chart</Ti>
            <div style={{display:'flex',alignItems:'flex-end',gap:5,height:90,marginTop:12}}>
              {weekEntries.map(([date,d],i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div style={{fontSize:9,color:C.gold}}>{d.score}%</div>
                  <div style={{width:'100%',height:`${Math.max((d.score/100)*70,4)}px`,background:`linear-gradient(to top,${C.gold},rgba(155,89,182,.8))`,borderRadius:'4px 4px 0 0',boxShadow:'0 0 6px rgba(201,168,76,.3)'}}/>
                  <div style={{fontSize:8,color:C.dim,whiteSpace:'nowrap'}}>{date.split('/').slice(0,2).join('/')}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {moodH.length>1&&(
          <Card style={{marginBottom:14}}>
            <Ti>🔮 Mood Trend</Ti>
            <div style={{display:'flex',alignItems:'flex-end',gap:5,height:80,marginTop:12}}>
              {moodH.slice(0,7).reverse().map((m,i)=>(<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{width:'100%',height:`${(m.mood/5)*65}px`,background:`linear-gradient(to top,#9b59b6,rgba(201,168,76,.8))`,borderRadius:'4px 4px 0 0',minHeight:8}}/><div style={{fontSize:12}}>{MOODS[m.mood-1]?.e}</div></div>))}
            </div>
          </Card>
        )}

        <Card>
          <Ti>📊 Activity Summary</Ti>
          {[['📜 Journal Entries',notes.length,20],['🎨 Hobby Sessions',hobbyH.length,15],['😴 Sleep Logs',sleepH.length,10],['✅ Tasks Completed',tasks.filter(t=>t.done).length,20]].map(([l,v,max])=>(
            <div key={l} style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{color:C.text,fontSize:13}}>{l}</span>
                <span style={{color:C.gold,fontSize:13,fontWeight:'bold'}}>{v}</span>
              </div>
              <Bar pct={Math.min((v/max)*100,100)} h={5}/>
            </div>
          ))}
        </Card>
      </div>
    ),
  };

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0d0b1e 0%,#1a0a2e 55%,#0a1628 100%)',fontFamily:"'Segoe UI',sans-serif",position:'relative',overflow:'hidden'}}>
      <style>{`
        @keyframes twinkle{0%,100%{opacity:.05}50%{opacity:.85}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes quoteGlow{0%,100%{box-shadow:0 0 18px rgba(201,168,76,.12)}50%{box-shadow:0 0 40px rgba(201,168,76,.28)}}
        @keyframes popIn{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        @keyframes clockPulse{0%,100%{opacity:1}50%{opacity:.7}}
        @keyframes sparkle{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-150%) scale(0)}}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,.3);border-radius:4px}
        input[type=time]::-webkit-calendar-picker-indicator{filter:invert(.7) sepia(1) saturate(3) hue-rotate(5deg)}
      `}</style>
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        {STARS.map((s,i)=>(<div key={i} style={{position:'absolute',width:s.size,height:s.size,background:'#fff',borderRadius:'50%',left:s.left,top:s.top,animation:`twinkle ${s.dur} ${s.delay} ease-in-out infinite`}}/>))}
      </div>
        <div style={{position:'relative',zIndex:1,textAlign:'center',padding:'18px 16px 12px',borderBottom:'1px solid rgba(201,168,76,.18)',background:'rgba(0,0,0,.25)'}}>
        <button onClick={()=>supabase.auth.signOut()} title="Logout" style={{position:'absolute',top:12,right:14,background:'none',border:'1px solid rgba(201,168,76,0.25)',borderRadius:8,color:C.dim,cursor:'pointer',padding:'4px 10px',fontSize:11,transition:'all .2s'}} onMouseEnter={e=>{e.currentTarget.style.color=C.gold;e.currentTarget.style.borderColor=C.gold;}} onMouseLeave={e=>{e.currentTarget.style.color=C.dim;e.currentTarget.style.borderColor='rgba(201,168,76,0.25)';}}>🚪 Logout</button>
        <div style={{fontSize:21,fontWeight:'bold',color:C.gold,letterSpacing:3,textShadow:'0 0 24px rgba(201,168,76,.5)'}}>⚡ PERSONAL LIFE OS ⚡</div>
        <div style={{fontSize:14,color:C.cream,marginTop:5,fontStyle:'italic'}}>{greeting}, <span style={{color:C.gold,fontWeight:'bold',fontStyle:'normal'}}>{userName}</span> ✨</div>
        <div style={{fontSize:22,fontWeight:'bold',color:C.goldL,marginTop:5,fontFamily:'monospace',letterSpacing:2,animation:'clockPulse 2s ease-in-out infinite'}}>{clock}</div>
        <div style={{fontSize:12,color:C.dim,marginTop:3,fontStyle:'italic'}}>{dateS}</div>
      </div>
      <div style={{position:'relative',zIndex:1,display:'flex',flexWrap:'wrap',padding:'8px 10px',gap:6,borderBottom:'1px solid rgba(201,168,76,.1)',justifyContent:'center'}}>
        {TABS.map(t=>(<button key={t.id} onClick={()=>go(t.id)}
          style={{padding:'7px 15px',borderRadius:20,border:`1px solid ${tab===t.id?C.gold:'rgba(255,255,255,.1)'}`,background:tab===t.id?'rgba(201,168,76,.15)':'transparent',color:tab===t.id?C.gold:C.dim,cursor:'pointer',fontSize:14,fontWeight:'bold',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:5,transition:'all .25s',boxShadow:tab===t.id?'0 0 14px rgba(201,168,76,.35)':'none',letterSpacing:.4}}
          onMouseEnter={e=>{e.currentTarget.style.color=C.gold;e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.boxShadow='0 0 18px rgba(201,168,76,.5), 0 0 6px rgba(240,208,96,.4)';e.currentTarget.style.background='rgba(201,168,76,.1)';createGlitter(e);}}
          onMouseLeave={e=>{e.currentTarget.style.color=tab===t.id?C.gold:C.dim;e.currentTarget.style.borderColor=tab===t.id?C.gold:'rgba(255,255,255,.1)';e.currentTarget.style.boxShadow=tab===t.id?'0 0 14px rgba(201,168,76,.35)':'none';e.currentTarget.style.background=tab===t.id?'rgba(201,168,76,.15)':'transparent';}}>
          {t.icon} {t.label}
        </button>))}
      </div>
      <div key={tk} style={{position:'relative',zIndex:1,padding:'16px',maxWidth:620,margin:'0 auto',paddingBottom:48,animation:'fadeSlideUp .35s ease both'}}>
        {S[tab]?.()}
      </div>
    </div>
  );
}