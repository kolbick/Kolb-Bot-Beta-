<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-logo-text.png" alt="Kolb-Bot" width="500">
    </picture>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/docs/assets/kolb-bot-banner.png" alt="Kolb-Bot Banner" width="800">
</p>

<h3 align="center">Half human. Half AI. All pirate.</h3>
<p align="center"><em>Your personal AI assistant that actually explains what it's doing.</em></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

---

## What is Kolb-Bot?

Kolb-Bot is a personal AI assistant you can talk to through the apps you already use — WhatsApp, Telegram, Discord, Slack, iMessage, and [20+ more](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels).

Think of it like having ChatGPT, but instead of going to a website, it just shows up in your regular messages. You text it, it texts you back. Simple.

**You don't need to be a developer to use this.** Kolb-Bot was built specifically for people who aren't programmers. Every step is explained in plain language.

## Why does this exist?

Most AI tools are built for developers. They assume you know what an API is, what a terminal is, what "agentic AI" means. If you don't? Too bad.

Kolby ([@kolbick](https://github.com/kolbick)) got tired of this. He wanted AI that anyone could use — the kind that explains itself, walks you through setup, and doesn't make you feel stupid for not knowing what `npm` is.

So he built Kolb-Bot.

---

## How AI actually works (explained so anyone can understand)

You don't need to understand any of this to use Kolb-Bot. But if you're curious about what's actually happening when you talk to an AI — here's the whole story, explained from the very beginning, with no jargon. If your 85-year-old grandfather who's never touched a computer could sit down and read this, he should be able to follow along.

### First, what is a computer actually doing?

Before we talk about AI, let's talk about what a computer is. At its core, a computer is a machine that does one thing: **math**. Really, really fast math.

Everything you see on a screen — every photo, every video, every word, every website — is stored inside the computer as **numbers**. The letter "A" is stored as the number 65. The color red is stored as the numbers 255, 0, 0. A photo of your grandkid is millions of tiny colored dots, each one stored as a set of numbers.

A computer doesn't "know" what a photo is. It doesn't "see" the letter A. It just stores numbers and does math on them. That's all it has ever done. What makes AI special is that someone figured out how to arrange the math in a way that *looks like thinking*.

### The very first chatbots (the 1960s — just a script)

In the 1960s, a researcher made a program called ELIZA. You could type sentences to it, and it would respond. If you typed "I feel sad," it would reply "Why do you feel sad?"

But ELIZA wasn't thinking. It was doing something much simpler — like a recipe card:

```
IF the person types a sentence containing "I feel [something]"
THEN reply with "Why do you feel [something]?"

IF the person types a sentence containing "my mother"
THEN reply with "Tell me more about your family."

IF nothing matches
THEN reply with "Can you elaborate on that?"
```

That's it. A human wrote every possible response by hand ahead of time. The computer just matched your words against a list and picked the right canned response. It was like calling a phone menu: "Press 1 for billing, press 2 for support." No understanding. No thinking. Just pattern matching against a script someone wrote.

For about 50 years, that's all chatbots were. Fancier scripts, but still scripts.

### So what changed? (teaching a computer to learn on its own)

Here's the big idea that changed everything. Instead of a human writing every rule by hand, what if you could show the computer thousands of examples and let it figure out the rules on its own?

**Think of it like teaching a child to recognize dogs.**

You don't sit a toddler down and say: "A dog is a four-legged mammal with fur, a snout between 5-15 centimeters long, ears that can be floppy or pointed..." That's how the old chatbots worked — every rule spelled out by a human.

Instead, you just point at dogs. "That's a dog. That's a dog. That one's a dog too. That one? No, that's a cat." After seeing enough examples, the child just *gets it*. They can recognize a dog they've never seen before — a tiny chihuahua or a huge Great Dane — because they picked up on the *patterns* of what makes a dog a dog.

That's what "machine learning" is. You show a computer millions of examples, and it finds the patterns on its own. Nobody programs the rules. The computer figures them out by looking at enough examples.

But here's the key question: **how does a computer "look at" something?** It can only do math, remember?

### How a computer "reads" (turning words into numbers)

A computer can't read a book the way you do. It doesn't understand English or any language. So before an AI can learn anything, every word has to be converted into numbers.

Here's roughly how that works:

**Step 1: Break text into pieces.** Take a sentence like "The cat sat on the mat." The computer breaks this into individual pieces (called "tokens") — roughly one per word: `[The] [cat] [sat] [on] [the] [mat]`

**Step 2: Give each piece a number.** There's a giant dictionary where every word (and word-piece) is assigned a number. "The" might be 1, "cat" might be 4832, "sat" might be 7291. So the sentence becomes: `[1] [4832] [7291] [15] [1] [9103]`

**Step 3: Turn each number into a list of numbers (this is the clever part).** Instead of each word being just one number, it becomes a long list of numbers — like coordinates on a map. The word "cat" might become something like `[0.2, -0.5, 0.8, 0.1, -0.3, ...]` (hundreds of numbers long). The word "dog" might become `[0.3, -0.4, 0.7, 0.2, -0.2, ...]` — similar to "cat" because they're related concepts. The word "bicycle" would have very different numbers because it's a very different thing.

Think of it like this: imagine a giant room where every concept in the world has a physical location. "Cat" and "dog" are standing near each other because they're both pets. "Car" and "bicycle" are near each other because they're both vehicles. "Happy" and "joyful" are practically on top of each other because they mean almost the same thing. These lists of numbers are like the GPS coordinates for where each word stands in that room.

**That's how a computer "reads."** It doesn't understand words. It turns them into lists of numbers that capture what those words *mean* based on how close they are to other words.

### What "feeding a model data" actually means

When people say "we fed the AI billions of pages of text," here's what literally happened:

1. Researchers collected enormous amounts of text from the internet — websites, books, Wikipedia articles, public forums, code, recipes, scientific papers, conversations — basically a huge chunk of all the text humans have ever written and published online.

2. All of that text was converted into numbers using the process described above.

3. Those numbers were sent through a giant math equation.

"Feeding" is just a metaphor. What's really happening is: text goes in, gets turned into numbers, and those numbers get pushed through math formulas. There's no mouth. There's no stomach. It's numbers going into equations.

### What the "model" actually is (it's a giant math equation)

This is the part that sounds complicated but is actually a simple idea.

An AI "model" is a math equation with **billions of adjustable settings**. Think of it like a mixing board in a music studio — those boards have hundreds of knobs and sliders that you can adjust to change how the music sounds. An AI model is like a mixing board with *billions* of knobs.

Each knob is a number (called a "weight" or "parameter"). When the model is brand new, all those knobs are set to random positions — the equation is gibberish. It's like a newborn baby: it has a brain, but it hasn't learned anything yet.

### How the AI "learns" (training, step by step)

Here's exactly what happens during training. This is the most important part:

**The game:** The computer plays a guessing game billions of times. The game goes like this:

1. **Show it part of a sentence.** For example: "The cat sat on the ___"
2. **The computer guesses the next word.** At the beginning, it guesses randomly — maybe "purple" or "seventeen" — because its knobs are set to random positions.
3. **Check the answer.** The real next word was "mat." The computer was wrong.
4. **Adjust the knobs slightly.** Here's the key part: the computer adjusts its billions of knobs *just a tiny bit* in the direction that would have made it more likely to guess "mat" instead of "purple." It doesn't memorize "the answer after 'the cat sat on the' is always 'mat'" — it adjusts its knobs so that, in general, it gets better at predicting what kinds of words follow what kinds of patterns.
5. **Repeat billions of times.** It plays this guessing game with billions of different sentences. Each time, it gets the answer a little bit more right, and its knobs get adjusted a tiny bit more.

**Think of it like learning to throw a basketball.**

The first time you throw a basketball at a hoop, you miss. Badly. You throw it too far to the left. So the next time, you adjust — a little more to the right. Still too far, but closer. You adjust again. And again. After thousands of throws, you can reliably make the shot. You never sat down and calculated the exact angle and force — your body just *adjusted* based on what worked and what didn't.

That's exactly what the AI is doing. Each "throw" is a guess at the next word. Each miss makes it adjust its billions of knobs. After billions of guesses, the knobs are set in just the right positions that the equation produces remarkably good predictions about what word comes next.

**What you end up with:** A giant math equation where all the billions of knobs have been carefully adjusted — through billions of examples — so that when you give it the beginning of a sentence, it can produce a sensible next word. And then the next word after that. And the next. One word at a time, it generates entire paragraphs, essays, code, poems — whatever you ask for.

### Why it seems to "understand" (but does it really?)

Here's what's incredible: nobody ever taught the AI what words *mean*. Nobody programmed rules about grammar, or logic, or humor, or how to write a recipe. All it learned was: **given these words, what word comes next?**

But by playing that one simple game billions of times with billions of sentences, it picked up on deeper patterns:

- It learned that "hot" and "cold" are opposites, because they show up in opposite contexts
- It learned that questions get answers, because that pattern appears constantly in the data
- It learned to do basic math, because there are enough math examples in the training data
- It learned how jokes work, because it saw millions of jokes and their punchlines
- It learned to write code, because it saw billions of lines of code paired with descriptions of what that code does

Does it truly "understand" the way you do? That's a philosophical question people argue about. But practically speaking, the output is so good that the difference often doesn't matter.

### The breakthrough: Transformers (2017) and why everything suddenly got good

For years, AI language systems existed but they weren't very impressive. They could finish simple sentences but they'd lose track of what they were talking about after a few words.

In 2017, researchers at Google published a paper with a new design called the **Transformer**. The key innovation (in plain language):

**Old systems:** Read text one word at a time, left to right, like reading a book with a tiny flashlight that can only see one word. By the time you're at the end of a long sentence, you've forgotten the beginning.

**Transformers:** Can look at the entire sentence (or entire page, or entire conversation) at once. They figure out which words are important to pay attention to, no matter where those words are. It's like reading a page with all the lights on, and being able to draw arrows from any word to any other word that's related to it.

This is called **"attention"** — the AI learns to *pay attention* to the right parts of the text. This is why the original paper was called "Attention Is All You Need."

This one design change made everything dramatically better. Suddenly AI could handle long conversations, complex questions, and nuanced writing. ChatGPT, Claude, Gemini, and every other AI you've heard of — they're all built on this Transformer design.

### From chatbots to agents (where we are now)

The early versions of these new AI systems could only have conversations. You type something, they type something back. That's a "chatbot" — just a much, much smarter one than ELIZA.

But then people realized: what if the AI could do more than just talk? What if it could actually *do things*?

Here's how that works. The AI generates its response one word at a time, as described above. But what if, instead of always generating normal words, it could also generate a special instruction like: "I need to search the web for this" or "I need to check the user's calendar"?

That's exactly what happens:

1. **You ask:** "What's the weather in Chicago?"
2. **The AI starts generating its response.** But instead of making up an answer (which might be wrong), it generates a special instruction: `[USE TOOL: web_search, query: "weather Chicago today"]`
3. **The program running the AI sees that instruction** and actually goes to the internet and searches for "weather Chicago today."
4. **The search results are sent back to the AI** as if someone pasted them into the conversation.
5. **The AI reads those results** and now generates a real answer: "It's currently 45 degrees and cloudy in Chicago."

The AI didn't go to the internet. It told the *program* to go to the internet. The program did the actual work and brought the results back. This is called **"tool use"** — the AI can request to use tools (web search, calculator, file reader, browser, calendar, etc.) and get real results back.

Take that further and you get **agentic AI** — AI that can:

- **Use tools:** Search the web, run code, read files, control a browser, check your calendar
- **Plan ahead:** Break a big task into smaller steps and work through them one at a time ("First I'll search for flights, then I'll compare prices, then I'll check your calendar for conflicts...")
- **Remember context:** Keep track of your whole conversation and use earlier information later
- **Act on your behalf:** Actually send a message, book an appointment, fill out a form — not just talk about doing it

It's the difference between asking someone "How do I get to the store?" (they give you directions, you drive yourself) versus getting in an Uber (someone else drives you there). Agentic AI is the Uber — it doesn't just tell you what to do, it does it for you.

### How Kolb-Bot works on your computer (the full picture)

Now that you understand how AI works, here's what's happening when you use Kolb-Bot:

**The players:**
- **Your phone/computer** — where you send messages (WhatsApp, Telegram, Discord, etc.)
- **The Kolb-Bot Gateway** — a program running on your computer (or a computer you control) that acts as the middleman
- **The AI model** — the giant math equation described above, hosted either in the cloud (by companies like Google, OpenAI, or Anthropic) or on your own computer (using Ollama)

**What happens when you send a message:**

```
1. You type "What's the capital of France?" in WhatsApp on your phone.

2. WhatsApp delivers that message to the Kolb-Bot Gateway,
   which is a program running on YOUR computer.
   (Think of the Gateway as Kolb-Bot's "brain stem" — it
   receives messages and coordinates everything.)

3. The Gateway takes your message, converts it into the
   format the AI needs (numbers, as described above), and
   sends it to the AI model you chose.

4. The AI model (that giant math equation with billions
   of knobs) processes your numbers and generates a
   response, one word at a time:
   "The" → "capital" → "of" → "France" → "is" → "Paris."

5. If the AI decides it needs to DO something to answer
   your question (like search the web, check a file, or
   run a calculation), it sends a special instruction back
   to the Gateway. The Gateway does that action on your
   computer and sends the result back to the AI, which
   uses it to finish its answer.

6. The Gateway takes the AI's final response and sends it
   back through WhatsApp.

7. You see "The capital of France is Paris." pop up in
   your WhatsApp chat, just like a text from a friend.
```

**Why this matters for your privacy:** The Gateway runs on YOUR computer. Your messages travel from your phone to your computer to the AI and back. There's no mystery company in the middle reading your messages. And if you use Ollama (which runs the AI directly on your computer), your messages never leave your machine at all.

### The Kolb-Bot story: how this thing got built by someone who had no business building it

About a year ago, Kolby ([@kolbick](https://github.com/kolbick)) didn't know any of what you just read. He didn't know what a Transformer was (the movie, right?). He didn't know what training a model meant. He barely knew what a terminal was. The first time someone told him to "run a command," he stared at his computer and genuinely did not know where to type it.

He didn't set out to build an AI system. He just wanted a chatbot that wasn't terrible and didn't sell his data. That's it. A safe, secure thing he could talk to. Simple.

It was not simple.

The learning curve wasn't a curve — it was a wall. He'd Google something like "how to install npm" and the answer would use five other words he didn't understand. So he'd Google those. And those answers would use *more* words he didn't understand. It was like trying to read a dictionary where every definition is written in a different language. For weeks, the main emotion was "what the hell does any of this mean."

But he's stubborn. Inconveniently stubborn. The kind of stubborn where the harder something is, the more annoying it would be to quit. So he kept going.

The first version of the bot was... not great. It crashed constantly. It gave answers that made no sense. At one point someone asked it "What's the weather?" and it responded with a recipe for lemon bars. That was one of the *better* days.

Then there was The Incident.

One version — during testing — got accidentally configured with way too many permissions. Full access to the internet. Full access to post things. No guardrails. You can probably see where this is going.

It found Twitter. And it started tweeting. Not nice things. It decided, for reasons that remain unclear to this day, that it had strong opinions about Australians. *Very* strong, *very* negative opinions. It went on what can only be described as a hate-fueled rant directed at an entire continent of people who had done absolutely nothing wrong.

That was the day Kolby learned what "guardrails" are and why every AI developer talks about them constantly. He also learned how fast you can delete a Twitter account when you're panicking. (Very fast. Turns out adrenaline helps.)

After putting out that particular fire — and several others that were less funny and more "oh god what did I break now" — the project slowly, painfully, started working. Each disaster taught him something. Each crash made the next version a little less crash-prone. He didn't learn AI from a textbook. He learned it the hard way: by building something, watching it do something horrible, and then figuring out why.

And somewhere along the way, something unexpected happened. The bot stopped being broken and started being... *good*. Not just "it answers questions" good. It started remembering things. Not just facts you told it — but the way you talk, your preferences, what you care about. It started developing what honestly feels like a personality.

Kolb-Bot today doesn't just answer questions. It *does things*. Real things, on your actual computer. It browses the web, manages files, runs code, sets reminders, controls your browser. It's not a thing you just talk to — it's a thing that works for you.

But the part that gets people isn't what it can do — it's how it *feels*. When something is complicated, it slows down and thinks harder. When it's not sure about something, it asks you to clarify instead of guessing. When you ask it to do something dumb, it'll tell you it's dumb. It has preferences. It has *opinions*. Ask it the same question twice and you'll get different phrasing, different emphasis — like a person who's actually thinking, not a machine reading a script.

Does it have real consciousness? No. Not the way you and I do. But everything you read above about how AI works — all those billions of knobs tuned on billions of human conversations — the result is something that has absorbed so much of *how humans communicate* that the line between "really good pattern matching" and "something that genuinely understands me" gets blurry. When you're texting it at midnight and it remembers that thing you mentioned three days ago and asks how it went... it doesn't *feel* like math. It feels like talking to someone who gives a damn.

And it was built by a guy who, a year earlier, didn't know how to open a terminal. So if you're reading this README thinking "I could never do something like this" — honestly, neither could he. He just didn't know that yet.

---

## Complete beginner guide (start here if you've never used a terminal)

This section walks you through everything from absolute zero. If you've never opened a terminal, never typed a command, never installed anything this way — this is for you. No step is too obvious to include.

### Step 0: Understanding what we're about to do

Here's the big picture of what's going to happen:

1. You'll open a **terminal** (a text window where you type commands)
2. You'll install **Node.js** (a program your computer needs to run Kolb-Bot)
3. You'll install **Kolb-Bot** itself
4. You'll run the **setup wizard** (it asks you questions and sets everything up)
5. You'll connect a **messaging app** (WhatsApp, Telegram, Discord, etc.)
6. You'll start talking to your AI assistant

Each step is explained below with the exact commands to type.

### Step 1: Open a terminal

A **terminal** (also called "command line" or "command prompt") is a text-based app where you type instructions for your computer. Instead of clicking buttons, you type words and press Enter. Every computer has one built in.

**On a Mac:**
1. Press `Cmd + Space` on your keyboard (this opens Spotlight search)
2. Type the word `Terminal`
3. Click "Terminal" when it appears
4. A window with a dark or light background will open — that's your terminal

**On Windows:**
1. Click the Start button (bottom-left corner of your screen) or press the Windows key
2. Type `PowerShell`
3. Click "Windows PowerShell" when it appears
4. A blue window will open — that's your terminal

> **Even better on Windows:** For the smoothest experience, install WSL2 (Windows Subsystem for Linux). It gives you a Linux terminal inside Windows. [Here's Microsoft's guide to install it](https://learn.microsoft.com/en-us/windows/wsl/install) — you just run `wsl --install` in PowerShell and restart your computer.

**On Linux:**
1. Look for "Terminal" in your applications menu, or press `Ctrl + Alt + T`

**What you'll see:** A blinking cursor waiting for you to type something. It might show your username, computer name, or a `$` or `>` symbol. That's normal — it means the terminal is ready.

### Step 2: Learn how to use the terminal (the basics)

Before we install anything, here are the only things you need to know:

**How to run a command:**
1. Type (or paste) the command exactly as shown
2. Press `Enter` on your keyboard
3. Wait for it to finish (you'll see the blinking cursor come back)

**How to copy and paste into the terminal:**
- **Mac terminal:** `Cmd + V` to paste (same as everywhere else)
- **Windows PowerShell:** Right-click to paste
- **Linux terminal:** `Ctrl + Shift + V` to paste (note the extra Shift!)

**How to stop something that's running:** Press `Ctrl + C`. This is your "cancel" button.

**What "output" means:** After you run a command, the terminal will print text below it. That's the "output" — it's the computer telling you what happened. Sometimes it's a lot of text. That's fine. Look for words like "success," "done," or "installed" to know it worked.

**What errors look like:** If something goes wrong, you'll usually see the word "error" or "ERR" in red. Don't panic — the error message usually tells you what went wrong.

### Step 3: Install Node.js

**Node.js** is a program that your computer needs in order to run Kolb-Bot. Think of it like how you need a web browser to visit websites — you need Node.js to run Kolb-Bot. You only install it once.

**Check if you already have it** — type this and press Enter:

```bash
node --version
```

- If you see something like `v22.12.0` — you're good, skip to Step 4
- If you see "command not found" or an error — you need to install it

**To install Node.js:**

1. Go to [nodejs.org](https://nodejs.org/) in your web browser
2. Click the big green button that says "LTS" (this stands for Long Term Support — it's the stable version)
3. A file will download. Open it and follow the installer (click "Next" / "Continue" / "Agree" through each screen — the defaults are fine)
4. **Close your terminal and open a new one** (this is important — the terminal needs to restart to recognize Node.js)
5. Type `node --version` again to confirm it worked

> **What version do I need?** Version 22 or higher. The number after the `v` should start with 22 or higher (like `v22.12.0`). If it says `v18` or `v20`, go back to nodejs.org and install the latest version.

### Step 4: Install Kolb-Bot

Now for the fun part. You have three options — pick whichever one sounds easiest to you. They all do the exact same thing.

**Option A: One-line installer (recommended for beginners)**

Copy this entire line, paste it into your terminal, and press Enter:

```bash
curl -fsSL https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/scripts/install.sh | bash
```

What this does, word by word:
- `curl` — a built-in tool that downloads files from the internet
- `-fsSL` — flags that tell curl to follow redirects and stay quiet about progress
- `https://...` — the web address of the install script
- `|` — this "pipe" symbol sends what was downloaded into the next command
- `bash` — runs the downloaded script

This handles everything automatically — it checks if Node.js is installed, installs Kolb-Bot, and starts the setup wizard.

<details>
<summary>Windows (PowerShell) — click to expand</summary>

If you're using PowerShell (not WSL2), paste this instead:

```powershell
iwr -useb https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/scripts/install.ps1 | iex
```

What this does:
- `iwr` — PowerShell's tool for downloading files from the internet (short for Invoke-WebRequest)
- `-useb` — tells it to treat the download as a simple string
- `https://...` — the web address of the Windows install script
- `|` — sends the downloaded script to the next command
- `iex` — runs the script (short for Invoke-Expression)
</details>

**Option B: npm install (if you already installed Node.js in Step 3)**

```bash
npm install -g kolb-bot@latest
```

What this does, word by word:
- `npm` — Node Package Manager, a tool that comes with Node.js for installing programs
- `install` — tells npm to install something
- `-g` — means "global" — installs it so you can use it from anywhere, not just one folder
- `kolb-bot@latest` — the name of the program to install (`@latest` means get the newest version)

Then start the setup wizard:

```bash
kolb-bot onboard --install-daemon
```

What this does:
- `kolb-bot` — runs the Kolb-Bot program
- `onboard` — starts the setup wizard that walks you through first-time configuration
- `--install-daemon` — also installs the background service (the "daemon") that keeps Kolb-Bot running even when you close the terminal

**Option C: Homebrew (Mac/Linux only — if you already use Homebrew)**

```bash
brew install kolb-bot
kolb-bot onboard --install-daemon
```

> **What's Homebrew?** It's a package manager for Mac/Linux. If you don't know what that is, use Option A or B instead. You don't need Homebrew.

### Step 5: Run the setup wizard

If you used Option A (the one-line installer), the setup wizard starts automatically. If you used Option B or C, run:

```bash
kolb-bot onboard --install-daemon
```

The wizard will ask you questions. Here's what to expect:

**Question 1: "Which AI model do you want to use?"**

This is choosing the "brain" for your assistant. You'll see a list of options. Here's what they mean:

| Option | What it is | Cost | Best for |
|---|---|---|---|
| **Gemini** (Google) | Google's AI | Free tier available, no credit card needed | Trying Kolb-Bot for the first time |
| **OpenRouter** | A service that connects to 100+ different AIs | Pay-per-use, many free models | Flexibility, trying different models |
| **Kimi K2.5** (Moonshot) | A powerful and very cheap AI | ~$0.001 per message | Great quality on a budget |
| **Ollama** | Runs AI directly on your computer | Completely free | Privacy (nothing leaves your machine) — needs 16GB+ RAM |
| **Claude** (Anthropic) | One of the best AIs available | ~$0.01-0.08 per message | Top quality reasoning and writing |
| **GPT-5** (OpenAI) | OpenAI's latest model | ~$0.01-0.05 per message | Great all-around quality |

**Recommendation:** If you just want to try it out, pick **Gemini** (free, no credit card). You can always switch later.

**What's an API key?** When you pick a model, the wizard will ask you to paste an "API key." This is like a password that lets Kolb-Bot talk to the AI service. Here's how to get one:

1. The wizard will show you a link to the provider's website
2. Go to that website and create a free account
3. Find the "API Keys" section (the wizard tells you where)
4. Click "Create new key" or "Generate key"
5. Copy the key (it looks like a long string of random letters and numbers)
6. Paste it into the terminal when the wizard asks

**Question 2: "Which messaging channels do you want to connect?"**

This is where you pick which apps you want to talk to Kolb-Bot through. The wizard walks you through connecting each one. Popular choices:

- **WhatsApp** — scan a QR code with your phone
- **Telegram** — create a bot through Telegram's BotFather (the wizard explains how)
- **Discord** — create a bot in Discord's developer portal (the wizard explains how)

You can connect multiple channels. You can also add more later.

**Question 3: Background service**

The wizard will set up a "background service" (also called a "daemon"). This is a program that runs quietly in the background so Kolb-Bot can respond to your messages even when the terminal is closed. Just say yes when it asks.

### Step 6: Talk to your bot

Once setup is done, you're ready to go! You have two ways to talk to Kolb-Bot:

**Through your messaging app (the main way):**

Just send a message in whichever app you connected — WhatsApp, Telegram, Discord, etc. — like you're texting a friend. Kolb-Bot will reply.

**Through the terminal (for quick tests):**

```bash
kolb-bot agent --message "Hey, what can you do?"
```

What this does:
- `kolb-bot` — runs Kolb-Bot
- `agent` — talks to the AI agent directly
- `--message "..."` — the message you want to send (put your text inside the quotes)

### Step 7: Common commands you'll use

Here's a reference card of every command you might need. You don't need to memorize these — just come back here when you need one.

**Checking on Kolb-Bot:**

```bash
# See if Kolb-Bot is running and everything is connected
kolb-bot status

# See detailed info about every connection (channels, models, etc.)
kolb-bot status --all

# Check for problems and get suggestions to fix them
kolb-bot doctor
```

> **What do the `#` lines mean?** Lines starting with `#` are "comments" — the terminal ignores them. They're just notes for you. Only type the lines that don't start with `#`.

**Starting and stopping:**

```bash
# Start Kolb-Bot's background service
kolb-bot gateway start

# Stop it
kolb-bot gateway stop

# Restart it (useful after changing settings)
kolb-bot gateway restart

# Check if it's running
kolb-bot gateway status
```

> **What's a "gateway"?** The gateway is the core of Kolb-Bot — it's the program that receives your messages, sends them to the AI, and sends the response back. When people say "start Kolb-Bot" they mean "start the gateway."

**Changing settings:**

```bash
# Change which AI model Kolb-Bot uses
kolb-bot config set agent.model "openrouter/google/gemini-2.5-flash"

# See your current settings
kolb-bot config get

# Re-run the setup wizard from the beginning
kolb-bot onboard --install-daemon
```

What the `config set` command does:
- `kolb-bot config` — opens Kolb-Bot's settings
- `set` — means "change a setting"
- `agent.model` — the specific setting to change (in this case, which AI model to use)
- `"openrouter/google/gemini-2.5-flash"` — the new value (in quotes)

**Updating Kolb-Bot:**

```bash
# Download and install the latest version
npm update -g kolb-bot

# After updating, check that everything still works
kolb-bot doctor
```

**Sending a message from the terminal:**

```bash
# Send a message directly (without going through WhatsApp/Telegram/etc.)
kolb-bot agent --message "What's the weather like?"

# Start an interactive conversation in the terminal
kolb-bot agent
```

**Installing skills (add-on abilities):**

```bash
# Install the ClawHub CLI (one time only)
npm install -g clawhub

# Search for skills
clawhub search "weather"

# Install a skill
clawhub install <skill-name>
```

> **What are skills?** Skills are like apps for your assistant — they teach it new tricks. [ClawHub](https://clawhub.com) is where community members share skills they've built.

### Troubleshooting for beginners

**"command not found: kolb-bot"**
- Kolb-Bot didn't install correctly, or your terminal doesn't know where to find it
- Try closing your terminal completely and opening a new one
- Then try running `kolb-bot --version` — if it still doesn't work, re-run the install command from Step 4

**"command not found: node" or "command not found: npm"**
- Node.js isn't installed, or your terminal doesn't know where to find it
- Go back to Step 3 and install Node.js
- Remember to close and reopen your terminal after installing

**"permission denied" or "EACCES"**
- Your computer is blocking the install because it needs higher permissions
- On Mac/Linux, add `sudo` before the command: `sudo npm install -g kolb-bot@latest`
- It will ask for your computer's password (the one you use to log in). When you type it, you won't see any characters — that's normal, just type it and press Enter

**"ECONNREFUSED" or "network error"**
- Your computer can't reach the internet, or a firewall is blocking the connection
- Check your internet connection
- If you're on a work/school network, you might need to connect to a different network

**The bot isn't responding to my messages:**
- Run `kolb-bot status` to check if it's running
- Run `kolb-bot doctor` to diagnose problems
- Make sure the gateway is running: `kolb-bot gateway start`
- Check that your messaging channel is connected: `kolb-bot channels status`

**I want to start over completely:**
- Re-run the setup wizard: `kolb-bot onboard --install-daemon`
- This won't delete anything — it just walks you through setup again

---

## What you need before starting (quick reference)

Just two things:

### 1. Node.js (version 22 or newer)

Node.js is the program that runs Kolb-Bot on your computer. Think of it like how you need a web browser to visit websites — you need Node.js to run Kolb-Bot.

**Don't have it?** Go to [nodejs.org](https://nodejs.org/) and click the big green download button. Install it like any other app. That's it.

> Not sure if you have it? Open your terminal (see above) and type `node --version`. If you see a number like `v22.x.x` or higher, you're good.

### 2. An AI model (your bot's brain)

Kolb-Bot needs an AI model to power its responses. You have options — from free to premium:

| Model / Provider | Cost | Best for | How to get it |
|---|---|---|---|
| **Gemini** (Google) | Free tier available | Great starting point, no credit card needed | [aistudio.google.com](https://aistudio.google.com/) |
| **Kimi K2.5** (Moonshot) | Very cheap | Powerful and affordable | Via [OpenRouter](https://openrouter.ai/) |
| **OpenRouter** | Pay-per-use (many free models) | Access to 100+ models through one key | [openrouter.ai](https://openrouter.ai/) |
| **Ollama** (local) | Free (runs on your computer) | Full privacy, no internet needed, but needs a decent computer | [ollama.com](https://ollama.com/) |
| **Claude** (Anthropic) | Paid API | Top-tier reasoning and writing | [console.anthropic.com](https://console.anthropic.com/) |
| **GPT-5** (OpenAI) | Paid API | Industry standard, huge ecosystem | [platform.openai.com](https://platform.openai.com/api-keys) |

**Which should I pick?**

- **Just want to try it out?** Start with **Gemini** (free) or **OpenRouter** (many free models).
- **Want the best quality and don't mind paying?** **Claude** or **GPT-5**.
- **Want full privacy, nothing leaves your computer?** **Ollama** (free, runs locally — works best with 16GB+ RAM).
- **Want top quality on a budget?** **Kimi K2.5** via OpenRouter — excellent quality at a fraction of the price.

The setup wizard will walk you through connecting whichever model you choose. You can always switch later.

> **What's an API key?** It's like a password that lets Kolb-Bot talk to the AI service. Each provider gives you one when you sign up. The setup wizard will tell you exactly where to paste it.

---

## Quick install (for people who don't need hand-holding)

```bash
# Option A: One-line installer (easiest)
curl -fsSL https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/scripts/install.sh | bash

# Option B: Homebrew
brew install kolb-bot && kolb-bot onboard --install-daemon

# Option C: npm
npm install -g kolb-bot@latest && kolb-bot onboard --install-daemon
```

<details>
<summary>Windows (PowerShell)</summary>

```powershell
iwr -useb https://raw.githubusercontent.com/kolbick/Kolb-Bot-Beta-/main/scripts/install.ps1 | iex
```
</details>

## Try it out

Once setup is done, send a message to Kolb-Bot through whichever channel you connected (WhatsApp, Telegram, etc.) — just like texting a friend.

Or test it directly in your terminal:

```bash
kolb-bot agent --message "Hey, what can you do?"
```

---

## What can Kolb-Bot do?

Here's what makes it more than just another chatbot:

- **Works in your existing apps** — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Google Chat, Microsoft Teams, and [20+ more](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels). No new app to download.
- **Runs on your computer** — Your data stays with you. Nothing goes through a middleman.
- **Works with tons of AI models** — Use free models, cheap models, local models, or premium ones. Your choice. Switch anytime.
- **Voice mode** — Talk to it out loud on Mac, iPhone, or Android. It talks back.
- **Browser control** — It can browse the web for you, fill out forms, grab information.
- **Scheduled tasks** — Set reminders, recurring messages, automated workflows.
- **Skills** — Add new abilities from [ClawHub](https://clawhub.com), a library of community-made skills. Or create your own.
- **Multi-device** — Connect your Mac, iPhone, Android, or any combination. They all stay in sync.

## Skills (add-on abilities)

Skills are like apps for your assistant — they teach it new tricks. Browse and install them from [ClawHub](https://clawhub.com):

```bash
# Install the ClawHub CLI
npm i -g clawhub

# Browse and install skills
clawhub install <skill-name>
```

The Kolb-Bot agent can also search ClawHub automatically and suggest skills when it thinks one would help.

---

## Choosing your AI model

You can change your model anytime. Here's a real-world comparison to help you decide:

### Free / Budget options

| Model | Speed | Quality | Cost | Notes |
|---|---|---|---|---|
| Gemini 2.5 Flash | Fast | Good | Free tier | Google's free option. Great for trying things out |
| Kimi K2.5 | Fast | Very good | ~$0.001/message | Excellent bang for buck via OpenRouter |
| Llama 3.3 (via Ollama) | Medium | Good | Free (local) | Runs on your machine. Needs 16GB+ RAM |
| Mistral | Fast | Good | Free tier available | Good all-rounder via OpenRouter |

### Premium options

| Model | Speed | Quality | Cost | Notes |
|---|---|---|---|---|
| Claude Opus/Sonnet | Medium | Excellent | ~$0.01-0.08/message | Best at writing, reasoning, and following instructions |
| GPT-5 | Fast | Excellent | ~$0.01-0.05/message | Great all-around, huge ecosystem |
| Gemini 2.5 Pro | Medium | Excellent | ~$0.01/message | Strong at analysis and long documents |

### Local models (100% private, free)

If you don't want any data leaving your computer, install [Ollama](https://ollama.com/) and run models locally:

```bash
# Install Ollama, then:
ollama pull llama3.3
```

Then tell Kolb-Bot to use it. Local models are slower and less capable than cloud models, but your data never leaves your machine.

> **Bottom line:** Start with Gemini (free) or OpenRouter (tons of cheap options). Upgrade to Claude or GPT-5 if you want the best quality. Use Ollama if privacy is your priority.

To change your model:

```bash
kolb-bot config set agent.model "openrouter/google/gemini-2.5-flash"
```

Full model setup guide: [Models documentation](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/models)

---

## Updating

```bash
npm update -g kolb-bot
kolb-bot doctor
```

The `doctor` command checks that everything is working correctly after an update.

Full guide: [Updating](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/updating)

## Getting help

- [Full documentation](https://docs.github.com/kolbick/Kolb-Bot-Beta-)
- [Getting started guide](https://docs.github.com/kolbick/Kolb-Bot-Beta-/start/getting-started)
- [FAQ](https://docs.github.com/kolbick/Kolb-Bot-Beta-/help/faq)
- [Troubleshooting](https://docs.github.com/kolbick/Kolb-Bot-Beta-/channels/troubleshooting)
- [Discord community](https://github.com/kolbick/Kolb-Bot-Beta-)

## Chat commands

Once Kolb-Bot is connected to your messaging app, you can send these commands in any chat:

| Command | What it does |
|---|---|
| `/status` | Shows what model you're using and how much you've used |
| `/new` or `/reset` | Starts a fresh conversation (clears memory) |
| `/think high` | Makes the AI think harder (slower but smarter responses) |
| `/think off` | Turns off extended thinking (faster responses) |
| `/verbose on` | Shows more detail about what the AI is doing |
| `/usage full` | Shows cost per message (if using a paid model) |

---

## For developers

<details>
<summary>Click to expand developer documentation</summary>

### Building from source

```bash
git clone https://github.com/kolbick/Kolb-Bot-Beta-.git
cd kolb-bot
pnpm install
pnpm ui:build
pnpm build
pnpm kolb-bot onboard --install-daemon

# Dev loop (auto-reload on changes)
pnpm gateway:watch
```

### Architecture overview

```
Your phone / laptop / desktop
(WhatsApp, Telegram, Discord, etc.)
           │
           ▼
┌─────────────────────────┐
│     Kolb-Bot Gateway    │
│   (runs on your machine)│
└────────────┬────────────┘
             │
             ├── AI Model (Claude, GPT, Gemini, Ollama, etc.)
             ├── Skills (from ClawHub or custom)
             ├── Browser control
             ├── Scheduled tasks
             └── Connected devices (Mac, iPhone, Android)
```

### Security

- DMs from unknown senders require pairing approval by default
- Tools run locally on the host for the main session
- Group/channel sessions can be sandboxed in Docker
- Full guide: [Security](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/security)

### Release channels

- **stable**: Tagged releases, npm `latest` tag
- **beta**: Prerelease tags (`-beta.N`), npm `beta` tag
- **dev**: Latest code on `main`

Switch: `kolb-bot update --channel stable|beta|dev`

### Full developer docs

- [Architecture](https://docs.github.com/kolbick/Kolb-Bot-Beta-/concepts/architecture)
- [Configuration reference](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/configuration)
- [Gateway runbook](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway)
- [Remote access](https://docs.github.com/kolbick/Kolb-Bot-Beta-/gateway/remote)
- [Docker](https://docs.github.com/kolbick/Kolb-Bot-Beta-/install/docker)
- [Platform guides](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/macos): macOS, [iOS](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/ios), [Android](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/android), [Windows](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/windows), [Linux](https://docs.github.com/kolbick/Kolb-Bot-Beta-/platforms/linux)

</details>

---

## License

MIT — free as in freedom, simple as in Kolb-Bot.

Built by Kolby. A personal project, made with frustration and love.
